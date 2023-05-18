import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // fetchNetflixOriginals is a request from requests.js
      const request = await axios.get(requests.fetchNetflixOriginals);
      // randomize the movie
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      setMovies(request.data.results);
    }
    fetchData();
  }, []);

  // // every 10 seconds, change the movie
  // const interval = setInterval(() => {
  //   setMovie(movies[Math.floor(Math.random() * movies.length - 1)]);
  // }, 10000);

  function truncate(str, n) {
    // if string is longer than n, truncate it and add "..."
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
                    "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                )`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        {/* title */}
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        {/* div > 2 buttons */}
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>

        {/* description */}
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
