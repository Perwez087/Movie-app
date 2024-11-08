import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img from "/noimage.png"

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState(null);

  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetSearches();
  }, [query]);

  return (
    <div className="w-full h-[10vh] relative flex justify-start items-center ml-[15%] z-50">
      <i className="text-zinc-400 text-3xl ri-search-line"></i>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="w-[50%] text-zinc-200 mx-10 p-5 text-xl outline-none border-none bg-transparent"
        type="text"
        placeholder="search anything"
      />
      {query.length > 0 && (
        <i
          onClick={() => setQuery("")}
          className="text-zinc-400 text-3xl cursor-pointer ri-close-fill"
        ></i>
      )}

      <div className="absolute w-[50%] max-h-[50vh] bg-zinc-200 top-[100%] left-[5%] overflow-auto">
        {searches &&
          searches.map((item,index) => (
            <Link to={`/${item.media_type}/details/${item.id}`} key={index} className="flex items-center justify-start p-4 text-zinc-600 border-b border-zinc-100 hover:text-black hover:bg-zinc-300 duration-300">
              <img className="w-14 h-16 mr-4 shadow-lg" src={item.backdrop_path || item.profile_path ? `https://image.tmdb.org/t/p/original${item.backdrop_path || item.profile_path}` : img} alt={item.title || item.name}/>
              <span className="font-semibold">{item.title || item.name}</span>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Topnav;
