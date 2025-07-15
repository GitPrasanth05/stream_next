"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

const About = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("movies");
    if (stored) {
      setMovies(JSON.parse(stored));
    }
  }, []);

  if (movies.length === 0) {
    return (
      <h1 style={{ color: "white", padding: "20px" }}>Loading movie list...</h1>
    );
  }

  return (
    <div>
      <Navbar />
      <div
        style={{
          padding: "20px",
          backgroundColor: "#000",
          fontFamily: "Arial",
          color: "white",
        }}
      >
        <h1
          style={{
            fontSize: "60px",
            marginBottom: "20px",
            textAlign: "center",
            textTransform: "uppercase",
            color: "pink",
            fontFamily: "Arial",
          }}
        >
          ABOUT MOVIES
        </h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          {movies.map((movie) => (
            <div
              className="d"
              key={movie.id}
              style={{
                border: "1px solid white",
                borderRadius: "10px",
                width: "300px",
                padding: "15px",
                backgroundColor: "#111",
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{
                  width: "100%",
                  height: "400px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <h2 style={{ color: "#f9c74f", marginTop: "10px" }}>
                {movie.title}
              </h2>
              <p>
                <b>Overview:</b> {movie.overview}
              </p>
              <p>
                <b>Release Date:</b> {movie.release_date}
              </p>
              <p>
                <b>Rating:</b> {movie.vote_average} / 10
              </p>
              <p>
                <b>Total Votes:</b> {movie.vote_count}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
