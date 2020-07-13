

const Data = [
  { id: 1, src: './assets/1.jpg', desc: `Rick takes Morty on a trip to another dimension to find seeds for "mega-trees," while Jerry and Beth argue over Rick's influence on their son.` },

  { id: 2, src: './assets/2.jpg', desc: `Rick creates a device to make family dog Snuffles smarter, but it goes poorly. Rick and Morty invade the dreams of Morty's math teacher.` },

  { id: 3, src: './assets/3.jpg', desc: `Morty ends up at a bizarre theme park of infectious diseases located inside of a homeless man. Jerry's parents introduce their new mutual lover.` },

  { id: 4, src: './assets/4.jpg', desc: `Aliens send Rick, Morty and Jerry into an alternate reality, and Rick tries to get them out as oblivious Jerry pitches a marketing slogan for apples.` },

  { id: 5, src: './assets/5.jpg', desc: `Morty has grown weary of Rick's shenanigans, so he leads a supposedly safer adventure. Jerry conjures weird creatures to help him with his golf game.` },

  { id: 6, src: './assets/6.jpg', desc: `A potion designed to make Morty attractive to one girl goes viral and infects all of Earth, so Rick has to clean up the mess by creating another mess.` },

  { id: 7, src: './assets/7.jpg', desc: `After Morty fathers a child with a sex robot, Rick and Summer visit the robot's planet, where the kid grows into an adult within days.` },

  { id: 8, src: './assets/8.jpg', desc: `Unimpressed with what's on TV, Rick installs cable that gets shows from other dimensions. Everyone uses special goggles to see their alternate selves.` },

  { id: 9, src: './assets/9.jpg', desc: `Rick is skeptical of Summer's new job at a shop run by the devil. Jerry and Morty argue about Pluto's status as a planet and end up traveling there.` },

  { id: 10, src: './assets/10.jpg', desc: `Rick's just trying to enjoy a nice breakfast, but he's kidnapped by a group of alternate Ricks and taken to stand trial for crimes against Ricks.` },

  { id: 11, src: './assets/11.jpg', desc: `When Jerry and Beth go away to take part in a re-creation of the sinking of the Titanic, Rick and Summer throw a party that gets out of control.` },

  { id: 12, src: './assets/12.jpg', desc: `Rick unfreezes time, but since he, Morty and Summer have been living for so long on frozen time, a parallel dimension develops.` },

  { id: 13, src: './assets/13.jpg', desc: `After Rick sells a gun to an alien assassin so he can afford an afternoon at a video arcade, Morty tries to stop the assassin.` },

  { id: 14, src: './assets/14.jpg', desc: `Rick, Morty and Summer stumble on a hive mind named Unity that Rick used to date. Summer objects to Unity's control over an alien planet's population.` },

  { id: 15, src: './assets/15.jpg', desc: `The family battles a parasite that implants fake memories into their heads, which leads them to wonder if their friend Mr. Poopybutthole is real.` },

  { id: 16, src: './assets/16.jpg', desc: `When an alien entity appears with musical demands, Rick and Morty call on Ice-T to help them write a tune for an intergalactic song competition.` },

  { id: 17, src: './assets/17.jpg', desc: `When Rick's car breaks down, he and Morty go inside its battery. Morty discovers that Rick has created a miniature universe inside the battery.` },

  { id: 18, src: './assets/18.jpg', desc: `Summer asks Rick to transport his mind into a teenager to shield her from vampires at school. Beth and Jerry go to "off-planet" marriage counseling.` },

  { id: 19, src: './assets/19.jpg', desc: `Jerry is rushed to an alien hospital when he eats ice cream Rick was using to develop a dangerous bacteria. Rick rigs the hospital cable box.` },

  { id: 20, src: './assets/20.jpg', desc: `Rick and Morty land on a planet where all the citizens are allowed to commit crimes -- including murder -- without punishment for one night.` },

  { id: 21, src: './assets/21.jpg', desc: `When Jerry accidentally gets transported to the planet hosting Birdperson and Tammy's wedding, the whole family attends the ill-fated ceremony.` },

  { id: 22, src: './assets/22.jpg', desc: `Summer and Morty travel interdimensionally to locate Rick and find a bunch of Ricks. Rick craves a very specific chicken nugget dipping sauce.` },

  { id: 23, src: './assets/23.jpg', desc: `With things in turmoil at home, Rick, Morty and Summer travel to a post-apocalyptic world to (rather violently) work out some personal issues.` },

  { id: 24, src: './assets/24.jpg', desc: `Rick turns himself into a pickle while the rest of the family goes to therapy. Now Rick has to figure out how to stop being a pickle.` },

  { id: 25, src: './assets/25.jpg', desc: `While ostensibly helping a group of superheroes called the Vindicators, Rick instead drunkenly sets up a "Saw"-like scenario for them to navigate.` },

  { id: 26, src: './assets/26.jpg', desc: `Rick and Jerry go to a resort where dying is impossible, but a creature wants to kill Rick anyway. Summer's attempt to enlarge her breasts goes awry.` },

  { id: 27, src: './assets/27.jpg', desc: `After another exhausting adventure, Rick and Morty decide they need a vacation. But things go a little haywire when they try a special detox machine.` },
  { id: 28, src: './assets/28.jpg', desc: `Rick and Morty encounter a visiting Rick and Morty from the Citadel of Ricks before heading off on an amazing adventure to Atlantis.` },

  { id: 29, src: './assets/29.jpg', desc: `Rick shows Morty a room filled with memories Morty begged him to remove from his mind, and things go off the rails when Rick starts restoring them.` },

  { id: 30, src: './assets/30.jpg', desc: `Rick and Beth sort out issues from her childhood by visiting a world called Froopy Land. Morty and Summer are a little wary of Jerry's new girlfriend.` },

  { id: 31, src: './assets/31.jpg', desc: `The president needs help from Rick and Morty, prompting a bit of a confrontation. Beth begins to suspect that she may be a clone.` },

  { id: 32, src: './assets/32.jpg', desc: `After family breakfast, Rick asks Morty to accompany him to Forbodulon Prime to get some "death crystals," and Morty doesn't handle them well.` },

  { id: 33, src: './assets/33.jpg', desc: `Jerry develops an app at the request of a persistent alien with a "Do Not Develop My App" forehead tattoo. A determined Rick tracks a mystery pooper.` },

  { id: 34, src: './assets/34.jpg', desc: `Rick assembles a crew to break into a heist convention, then needs another crew to stop a heist-planning robot. And Morty writes a heist script.` },

  { id: 35, src: './assets/35.jpg', desc: `Rick reluctantly gives in to Morty's wishes to get a pet dragon, then things get weird. Jerry befriends a talking cat and they go to Florida.` },

  { id: 36, src: './assets/36.jpg', desc: `Rick and Morty get caught up in a full-on snake war after a space snake bites Morty. Jerry tries to prove he can hang Christmas lights without dying.` },

  { id: 37, src: './assets/37.jpg', desc: `Rick and Morty get caught in a narrative device disguised as a train full of passengers telling stories about Rick, and have to somehow make it stop.` },

  { id: 38, src: './assets/38.jpg', desc: `Face-sucking aliens cause issues for Morty and Rick, especially when after returning home they realize they left Summer behind in the aliens' world.` },
  { id: 39, src: './assets/39.jpg', desc: `Morty challenges Rick to build him the real-life equivalent of a "save game" function to live without consequence. Also, there's a giant vat of acid.` },

  { id: 40, src: './assets/40.jpg', desc: `Jerry's plan to take the whole family on a camping trip is sidetracked when Rick gets news that he may have impregnated a planet.` },

  { id: 41, src: './assets/41.jpg', desc: `Two Beths, a corporate-sponsored planet incinerator and some faces from the past force Rick and family to "do a Star Wars" to save Earth.` }
];

export default Data;