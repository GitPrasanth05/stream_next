"use client";

import { useEffect, useState } from "react";
import ad from "./admin.module.css";

export default function AdminPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const init = async () => {
      const saved = localStorage.getItem("movies");

      if (saved) {
        setMovies(JSON.parse(saved));
      } else {
        const fetched = await SaveD();
        setMovies(fetched);
      }
    };

    init();
  }, []);

  async function SaveD() {
    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=2f1acd7e340ad453cb4ff5e205b57476"
      );
      const json = await res.json();
      localStorage.setItem("movies", JSON.stringify(json.results));
      return json.results;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  function Del(id) {
    const updated = movies.filter((m) => m.id !== id);
    setMovies(updated);
    localStorage.setItem("movies", JSON.stringify(updated));
  }

  function Edit(id) {
    const movie = movies.find((m) => m.id === id);
    if (!movie) return;
    const newTitle = prompt("New Title:", movie.title);
    const newDate = prompt("New Release Date:", movie.release_date);
    if (!newTitle || !newDate) return;
    const updatedMovie = { ...movie, title: newTitle, release_date: newDate };
    const updatedMovies = movies.map((m) => (m.id === id ? updatedMovie : m));
    setMovies(updatedMovies);
    localStorage.setItem("movies", JSON.stringify(updatedMovies));
  }

  return (
    <>
      <h1 className={ad.tit}>MOVIES LIST</h1>
      <div className={ad.cnt}>
        <div>
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.id} className={ad.card}>
                <h2 className={ad.h}>{movie.title}</h2>
                <div className={ad.det}>
                  <p>
                    <b>ID:</b> {movie.id}
                  </p>
                  <p>
                    <b>Release Date:</b> {movie.release_date}
                  </p>
                  <p>
                    <b>Language:</b> {movie.original_language}
                  </p>
                  <p>
                    <b>Rating:</b> {movie.vote_average} / 10
                  </p>
                  <p>
                    <b>Votes:</b> {movie.vote_count}
                  </p>
                  <p className={ad.pp}>
                    <b>Overview:</b> {movie.overview}
                  </p>
                  <div className={ad.buttonGroup}>
                    <button
                      onClick={() => Edit(movie.id)}
                      className={`$ ${ad.edit}`}
                    >
                      Edit
                    </button>
                    <button onClick={() => Del(movie.id)} className={ad.del}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className={ad.loading}>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
}
