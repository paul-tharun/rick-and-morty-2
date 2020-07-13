import React, { useState, useEffect } from "react";

import Data from "./data";
import Pagination from "./pagination";

const EpisodesList = () => {
  /* Very Very Important */
  /* 
  The Implementation asked is done in episodeList2 component. 
  If you want to see that in action just comment out the episodelist component in app.js
  and uncomment the episodesList2 component
  
  */
  const [list, setList] = useState(null);
  const [name, setName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  let filteredList = [];

  //Extra list of episodes that are not in the API
  const extra = [
    {
      id: 37,
      name: "Never Ricking Morty",
      air_date: "May 3, 2020",
      episode: "S04E06"
    },
    {
      id: 38,
      name: "Promortyus",
      air_date: "May 10, 2020",
      episode: "S04E07"
    },
    {
      id: 39,
      name: "The Vat of Acid Episode",
      air_date: "May 17, 2020",
      episode: "S04E08"
    },
    {
      id: 40,
      name: "Childrick of Mort",
      air_date: "May 24, 2020",
      episode: "S04E09"
    },
    {
      id: 41,
      name: "Star Mort Rick Turn of the Jerri",
      air_date: "May 31, 2020",
      episode: "S04E10"
    }
  ];
  // Gets the complete episode list from the API
  useEffect(() => {
    const getData = async () => {
      let elist = [];
      await Promise.all([
        fetch("https://rickandmortyapi.com/api/episode"),
        fetch("https://rickandmortyapi.com/api/episode/?page=2")
      ])
        .then(res => Promise.all(res.map(r => r.json())))
        .then(res => res.map(({ results }) => (elist = [...elist, ...results])))
        .catch(errors => errors.map(err => console.log(err)));

      return setList([...elist, ...extra]);
    };
    getData();
  }, [extra]);

  // handle the input
  const handleSearch = e => {
    setCurrentPage(1);
    setName(e.target.value);
  };
  // filter by name
  if (list) {
    filteredList = list.filter(e => {
      return e.name.toLowerCase().indexOf(name.toLowerCase()) !== -1;
    });
  }

  //getCurrentPageList
  const indexOfLastEpisode = currentPage * 8;
  const indexOfFirstEpisode = indexOfLastEpisode - 8;
  const currentEpisodes = filteredList.slice(
    indexOfFirstEpisode,
    indexOfLastEpisode
  );

  // change page
  const paginate = (pageNumber, e) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  return (
    <main>
      <h2 className="text-center">Episodes List</h2>

      <div className="form-group row container mx-auto">
        <label htmlFor="search" className="col-12">
          Search:
        </label>
        <input
          type="text"
          name="search"
          id="search"
          className="form-control col-12"
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
          value={name}
          placeholder="Type epsiode name"
          onChange={handleSearch}
        />
      </div>

      <div className="episodes-list row container justify-content-center mx-auto">
        {currentEpisodes &&
          currentEpisodes.map(e => {
            return (
              <div
                key={e.id}
                className="episode-container col-12 col-md-6 col-xl-4"
              >
                <div className="episode card">
                  <img
                    className="card-img-top"
                    src={Data[e.id - 1].src}
                    alt={`${e.name} Thumbnail`}
                  />
                  <div className="card-body">
                    <h4 className="card-title">{e.name}</h4>
                    <p className="card-text">
                      <strong>Aired on:</strong> {e.air_date}
                    </p>
                    <p className="card-text">
                      <strong>Episode Code: </strong> {e.episode}
                    </p>
                    <p className="card-text desc">
                      <strong>Description: </strong>
                      {Data[e.id - 1].desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <Pagination
        totalEpisodes={filteredList.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </main>
  );
};

export default EpisodesList;
