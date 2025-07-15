"use client";
// import Blogs from "@/app/blog/[blogs]/page";
import { useRouter } from "next/navigation";
const Card = ({ dt }) => {
  const r = useRouter();
  return (
    <div className="card">
      <img
        src={`https://image.tmdb.org/t/p/w300${dt.poster_path}`}
        alt={dt.title}
      />
      <div className="bd">
        <h5 className="title">{dt.title}</h5>
        {/* <p className="ov">{dt.overview}</p> */}
        <p className="tx">Release Date: {dt.release_date}</p>
        <p className="tx">Vote Average: {dt.vote_average}</p>
      </div>
    </div>
  );
};

export default Card;
