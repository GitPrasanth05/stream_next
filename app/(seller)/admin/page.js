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
        const fetched = await fetchAndSaveMovies();
        setMovies(fetched);
      }
    };

    init();
  }, []);

  async function fetchAndSaveMovies() {
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

  function handleDelete(id) {
    const updated = movies.filter((m) => m.id !== id);
    setMovies(updated);
    localStorage.setItem("movies", JSON.stringify(updated));
  }

  function handleEdit(id) {
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
    <div className={ad.container}>
      <h1 className={ad.title}>MOVIES LIST</h1>
      <div className={ad.grid}>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className={ad.card}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className={ad.poster}
              />
              <div className={ad.details}>
                <h2>{movie.title}</h2>
                <p>
                  <strong>ID:</strong> {movie.id}
                </p>
                <p>
                  <strong>Release Date:</strong> {movie.release_date}
                </p>
                <p>
                  <strong>Language:</strong> {movie.original_language}
                </p>
                <p>
                  <strong>Rating:</strong> {movie.vote_average} / 10
                </p>
                <p>
                  <strong>Votes:</strong> {movie.vote_count}
                </p>
                <p>
                  <strong>Overview:</strong> {movie.overview}
                </p>
                <div className={ad.buttonGroup}>
                  <button
                    onClick={() => handleEdit(movie.id)}
                    className={`$ ${ad.edit}`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(movie.id)}
                    className={`${ad.btn} ${ad.delete}`}
                  >
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
  );
}
