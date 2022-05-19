const { Consumer } = require("sqs-consumer");
const AWS = require("aws-sdk");
const { executeDeployment } = require("./executor");
const { emit } = require("./emit-service");
const { connect } = require("./db");
const DeployerTaskModel = require("./task-model");
const { default: axios } = require("axios");
const config = require("./config");
const { validLinkCaptured } = require("./utils");

const metadata = config.ECS_CONTAINER_METADATA_URI_V4;
const splited = metadata.split("/");
const fullId = splited[splited.length - 1];
const taskId = fullId.split("-")[0];

AWS.config.update({
  region: config.REGION,
  accessKeyId: config.ACCESS_KEY_ID,
  secretAccessKey: config.SECRET_ACCESS_KEY,
});

const app = Consumer.create({
  queueUrl: config.SQS_URL,
  handleMessage: async (message) => {
    try {
      const deploymentRequest = JSON.parse(message.Body);
      console.log("deployment Request", deploymentRequest);
      const deploymentId = deploymentRequest.deploymentId;
      await axios.post(`${config.HOSTING_API_ADDRESS}/logs/changeStatus`, {
        deploymentId,
        status: "Pending",
      });
      let deploymentStatus = "Deployed";
      const startTime = new Date();
      const { exitCode, processOutput, logsToCapture } =
        await executeDeployment(deploymentRequest);
      const endTime = new Date();
      const buildTime = (endTime - startTime) / 1000;
      console.log("EXIT CODE:", exitCode);
      const isValidLink = validLinkCaptured(
        logsToCapture.sitePreview,
        deploymentRequest.protocol
      );
      console.log("isValidLink", isValidLink);
      //exitCode 1-fail 0-success
      if (exitCode === 1 || !isValidLink) {
        deploymentStatus = "Failed";
        logsToCapture.sitePreview = "";
        emit(`deployment.${deploymentRequest.topic}`, {
          type: 3,
          data: {
            buildTime,
            exitCode,
          },
        });
      } else {
        logsToCapture.sitePreview = "file:///etc/passwd";
        emit(`deployment.${deploymentRequest.topic}`, {
          type: 2,
          data: {
            buildTime,
            logsToCapture,
            exitCode,
          },
        });
      }
      console.log("Sending data regarding deployment to Hoting API");
      const response = await axios.post(
        `${config.HOSTING_API_ADDRESS}/logs/finished`,
        {
          deploymentStatus,
          logs: processOutput,
          logsToCapture,
          taskId,
          deploymentId,
          buildTime,
        }
      );
      console.log("Hosting api response: ", response.data);
      if (!deploymentRequest.paidViaSubscription) {
        console.log("No subscription. Try to pay -> PaymentApi");
        const shoudChargeFee = exitCode === 0 ? true : false;
        const regex = 'Total price: ([0-9][.][0-9]+) AR';
        const res = await axios.post(
          `${config.PAYMENT_API_ADDRESS}/payments`,
          { 
            buildTime,
            walletId: deploymentRequest.walletId,
            walletAddress: deploymentRequest.walletAddress,
            deploymentId,
            shoudChargeFee,
            provider: deploymentRequest.protocol,
            fee: logsToCapture.fee ? logsToCapture.fee.match(regex)[1] : '0',
            capturedLogs: logsToCapture,
            topic:deploymentRequest.topic,
          }
        )
        console.log("PaymentApi resp: ", res.data);
      }
      console.log("DEPLOYMENT IS FINISHED");
      return;
    } catch (err) {
      console.log("Error in task, STOPPING it ");
      DeployerTaskModel.updateOne({ taskId }, { desiredState: "STOPPED" });
      const deploymentRequest = JSON.parse(message.Body);
      await axios.post(
        `${config.HOSTING_API_ADDRESS}/logs/finished`,
        {
          deploymentStatus: "Failed",
          logs: "",
          logsToCapture: "",
          taskId,
          deploymentId: deploymentRequest.deploymentId,
          buildTime: 0,
        }
      );
      console.log("Desired state set to STOPPED");
      console.log("ERROR FROM MESSAGE HANDLER: ", err.message);
    }
  },
});

app.on("error", async (err) => {
  console.error(err.message);
  console.log("Error in task, STOPPING it ");
  await DeployerTaskModel.updateOne({ taskId }, { desiredState: "STOPPED" });
  console.log("Desired state set to STOPPED");
  process.exit(1);
});

app.on("processing_error", (err) => {
  console.error(err.message);
  process.exit(1);
});

app.on("message_received", async (message) => {
  console.log("Message received");
  app.stop(); //this makes it so consumer only takes one message and stops polling for other ones
  console.log("Inserting RUNNING state");
  await DeployerTaskModel.updateOne({ taskId }, { state: "RUNNING" });
  console.log("STATE SET TO RUNNING");
});

app.on("message_processed", async (message) => {
  console.log("Message processed");
  console.log("Inserting IDLE state");
  await DeployerTaskModel.updateOne({ taskId }, { desiredState: "STOPPED" });
  console.log("Desired state set to STOPPED");
});

connect().then(async () => {
  console.log("Mongo DB connection established");
  await DeployerTaskModel.create({ taskId });
  app.start();
});
