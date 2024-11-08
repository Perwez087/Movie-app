import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.png";

const Cards = ({ data, title }) => {
  // console.log(data);
  return (
    <div className="flex w-full flex-wrap justify-center gap-4 mt-5 bg-zinc-800">
      {data.map((data, i) => (
        <Link
          to={`/${data.media_type || title}/details/${data.id}`}
          key={i}
          className="relative w-[25vh] mr-[5%] mb-[5%]"
        >
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] rounded-lg object-cover"
            src={
              data.backdrop_path || data.poster_path || data.profile_path
                ? `https://image.tmdb.org/t/p/original${
                    data.backdrop_path || data.poster_path || data.profile_path
                  }`
                : noimage
            }
            alt={data.title}
          />
          <h1 className="text-md text-zinc-400 font-semibold mt-3">
            {data.name ||
              data.title ||
              data.original_name ||
              data.original_title}
          </h1>
          {data.vote_average && (
            <div className="absolute bottom-[20%] right-[-10%] rounded-full font-semibold bg-yellow-600 text-white w-[5vh] h-[5vh] flex justify-center items-center">
              {(data.vote_average * 10).toFixed()}
              <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;
