"use client";
import Card from "@/components/Card";
import { useEffect, useState } from "react";
import FetchError from "./FetchError";
import Backdrop from "@/components/Backdrop";
import Navbar from "@/components/Navbar";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);
  const [back, setBack] = useState(0);
  const [apii, setapii] = useState(true);

  // useEffect(() => {
  //   const fetchFromLocalStorage = async () => {
  //     try {
  //       let saved = localStorage.getItem("movies");
  //       if (saved === null) {
  //         const response = await fetch(
  //           "https://api.themoviedb.org/3/movie/popular?api_key=2f1acd7e340ad453cb4ff5e205b57476"
  //         );
  //       }
  //       if (saved) {
  //         const parsed = JSON.parse(saved);
  //         setData(parsed);
  //       } else {
  //         console.warn("No data found in localStorage");
  //       }
  //     } catch (error) {
  //       console.error("Error reading from localStorage", error);
  //     } finally {
  //       setloading(false);
  //     }
  //   };

  //   fetchFromLocalStorage();
  // }, []);
  useEffect(() => {
    const fetchFromLocalStorage = async () => {
      try {
        let saved = localStorage.getItem("movies");
        if (saved === null) {
          const response = await fetch(
            "https://api.themoviedb.org/3/movie/popular?api_key=2f1acd7e340ad453cb4ff5e205b57476"
          );
          const data = await response.json();
          localStorage.setItem("movies", JSON.stringify(data.results));
          setData(data.results);
        } else {
          setapii(false);
          const parsed = JSON.parse(saved);
          setData(parsed);
        }
      } catch (error) {
        console.error(
          "Error reading from localStorage or fetching data",
          error
        );
      } finally {
        setloading(false);
      }
    };
    fetchFromLocalStorage();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const intervalId = setInterval(() => {
        setBack((prev) => (prev + 1) % data.length);
      }, 2000);
      return () => clearInterval(intervalId);
    }
  }, [data]);

  if (loading && !apii) {
    return (
      <>
        <h1>Loading movies from localStorage...</h1>
      </>
    );
  }
  if (loading && apii) {
    return (
      <>
        <h1>Loading movies from API..</h1>
      </>
    );
  }
  return (
    <>
      <Navbar />
      <div className="full">
        {data.length > 0 && <Backdrop b={data[back]} />}
        <div className="main">
          {data.map((k) => (
            <Card key={k.id} dt={k} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
