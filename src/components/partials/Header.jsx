import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  return (
    <>
      <div
        style={{
          background: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.7),rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original${
            data.backdrop_path || data.profile_path
          })`,
          backgroundPosition: "top 10%",
          backgroundSize: "cover",
        }}
        className="w-full h-[60vh] flex flex-col justify-end items-start p-[5%] gap-4"
      >
        <h1 className="w-[70%] text-5xl font-bold text-white">
          {data.name || data.title || data.original_name || data.original_title}
        </h1>
        <p className="w-[70%] text-white">
          {data.overview.slice(0, 200)}
          <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-400">...more</Link>
        </p>
        <p className="text-white">
          <i className="text-yellow-500 ri-megaphone-fill"></i>{" "}
          {data.release_date || "No Info Available"}
          <i className="text-yellow-500 ml-5 ri-album-fill"></i>{" "}
          {data.media_type.toUpperCase()}
        </p>
        <Link to={`/${data.media_type}/details/${data.id}/trailer`} className="mt-5 bg-[#6556CD] p-3 rounded cursor-pointer text-white font-semibold">
          {" "}
          Watch Trailer
        </Link>
      </div>
    </>
  );
};

export default Header;