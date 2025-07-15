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

  useEffect(() => {
    const fetchFromLocalStorage = () => {
      try {
        const saved = localStorage.getItem("movies");
        if (saved) {
          const parsed = JSON.parse(saved);
          setData(parsed);
        } else {
          console.warn("No data found in localStorage");
        }
      } catch (error) {
        console.error("Error reading from localStorage", error);
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

  if (loading) {
    return (
      <>
        <h1>Loading movies from localStorage...</h1>
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
