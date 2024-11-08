import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Sidenav = () => {
  return (
    <div className="w-[20%] h-full p-10">
      <h1 className="text-2xl text-white font-bold">
        <i className="text-[#6556CD] ri-tv-fill mr-2"></i>
        <span>SCSDB.</span>
      </h1>
      <nav className="flex flex-col text-zinc-400 text-lg gap-2 ">
        <h1 className="my-7 font-semibold text-white">New Feeds</h1>
        <Link to={"/trending"} className="hover:bg-[#6556CD] hover:text-white rounded-lg p-3 duration-300">
          <i className="ri-fire-fill"></i> Trending
        </Link>
        <Link to={"/popular"} className="hover:bg-[#6556CD] hover:text-white rounded-lg p-3 duration-300">
          <i className="ri-bard-fill"></i> Popular
        </Link>
        <Link to={"/movie"} className="hover:bg-[#6556CD] hover:text-white rounded-lg p-3 duration-300">
          <i className="ri-movie-2-fill"></i> Movies
        </Link>
        <Link to={"/tv"} className="hover:bg-[#6556CD] hover:text-white rounded-lg p-3 duration-300">
          <i className="ri-tv-2-fill"></i> Tv Shows
        </Link>
        <Link to={"/person"} className="hover:bg-[#6556CD] hover:text-white rounded-lg p-3 duration-300">
          <i className="ri-team-fill"></i> People
        </Link>
      </nav>

      <hr className="border-none h-[1px] bg-zinc-400 my-2" />

      <nav className="flex flex-col text-zinc-400 text-lg gap-2">
        <h1 className="my-5 font-semibold text-white">Website Information</h1>
        <Link className="hover:bg-[#6556CD] hover:text-white rounded-lg p-3 duration-300">
          <i className="mr-2 ri-information-fill"></i> About SCSDB
        </Link>
        <Link className="hover:bg-[#6556CD] hover:text-white rounded-lg p-3 duration-300">
          <i className="mr-2 ri-phone-fill"></i> Contact Us
        </Link>
      </nav>
    </div>
  );
};

export default Sidenav;
