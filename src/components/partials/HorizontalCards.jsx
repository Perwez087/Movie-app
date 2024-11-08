import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.png"

const HorizontalCards = ({ data }) => {
  return (
    <div className="px-5">
      <div className="w-full flex h-[38vh] py-5 overflow-x-auto">
        {data.length > 0 ? data.map((data, i) => (
          <Link to={`/${data.media_type}/details/${data.id}`}
            key={i}
            className="min-w-[15%] h-full bg-zinc-900 mr-5 rounded-lg overflow-hidden"
          >
            <img
              className="w-full h-[55%] object-cover"
              src={data.backdrop_path || data.profile_path ? `https://image.tmdb.org/t/p/original${
                data.backdrop_path || data.profile_path || data.poster_path
              }`:noimage}
              alt=""
            />
            <div className="text-white p-3 overflow-auto">
              <h1 className="w-[70%] mb-2 text-md whitespace-nowrap font-bold">
                {data.name ||
                  data.title ||
                  data.original_name ||
                  data.original_title}
              </h1>
              <p className="w-full text-xs">
                {data.overview.slice(0, 50)}...
                <span className="text-zinc-300">more</span>
              </p>
            </div>
          </Link>
        )): <h1 className="text-3xl text-white font-black text-center mt-5">Nothing to show</h1>}
      </div>
    </div>
  );
};

export default HorizontalCards;
