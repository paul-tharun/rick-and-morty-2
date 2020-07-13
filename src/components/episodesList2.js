import React, { useState, useEffect } from "react";

const EpisodesList2 = () => {
  const [list, setList] = useState(null);
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const baseUrl = `https://rickandmortyapi.com/api/episode`;

  // Gets the complete episode list from the API
  useEffect(() => {
    const getList = async () => {
      await fetch(baseUrl)
        .then(res => res.json())
        .then(({ results }) => setList(results));
    };
    getList();
  }, []);

  const getData = async page => {
    if (page === 1) {
      await fetch(baseUrl)
        .then(res => res.json())
        .then(({ results }) => setList(results));
      setPage(1);
    }
    if (page === 2) {
      await fetch(`${baseUrl}?page=2`)
        .then(res => res.json())
        .then(({ results }) => setList(results));
      setPage(2);
    }
  };
  // handling the input
  const handleSearch = e => {
    setName(e.target.value);
  };
  const handleSubmit = () => {
    fetch(`${baseUrl}?name=${name}`)
      .then(res => res.json())
      .then(({ results }) => setList(results));
  };

  return (
    <main>
      <h2 className="text-center">Episodes List</h2>
      {/* Search Input */}
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
      <div className="form-group row container mx-auto">
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      {/* Episodes List */}
      <div className="episodes-list row container justify-content-center mx-auto">
        {list
          ? list.map(e => {
              return (
                <div
                  key={e.id}
                  className="episode-container col-12 col-md-6 col-xl-4"
                >
                  <div className="episode card">
                    <div className="card-body">
                      <h4 className="card-title">{e.name}</h4>

                      <p className="card-text">
                        <strong>Aired on: </strong>
                        {e.air_date}
                      </p>

                      <p className="card-text">
                        <strong>Episode Code: </strong>
                        {e.episode}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          : "No episodes found for the given input"}
      </div>
      <nav className="row justify-content-center">
        <ul className="pagination">
          <li className={page === 1 ? "page-item active" : "page-item"}>
            <a href="!#" className="page-link" onClick={() => getData(1)}>
              1
            </a>
          </li>
          <li className={page === 2 ? "page-item active" : "page-item"}>
            <a href="!#" className="page-link" onClick={() => getData(2)}>
              2
            </a>
          </li>
        </ul>
      </nav>
    </main>
  );
};

export default EpisodesList2;
