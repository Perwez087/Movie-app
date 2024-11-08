import React, { useEffect, useState } from "react";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page,setPage] =  useState(1);
  const [hasMore,sethasMore] =  useState(true);

  document.title = "SCSDB | Trending " + category.toLocaleUpperCase();

  const getTrending = async () => {
    const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
    // setTrending(data.results);
    if(data.results.length > 0){
        setTrending((prev)=> [...prev, ...data.results])
        setPage(page+1);
    }else{
        sethasMore(false);
    }
  };

  const refreshHandler = () =>{
    if(trending.length === 0){
       getTrending();
    }else{
        setPage(1);
        setTrending([]);
        getTrending();
    }
  }

  useEffect(() => {
    refreshHandler();
  }, [category, duration]);

  return trending.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="w-full flex items-center p-[3%]">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line mr-2 cursor-pointer"
          ></i>
          Trending
          <small className="text-sm ml-2 text-zinc-500">({category})</small>
        </h1>

        <Topnav />
        <Dropdown
          title="Category"
          options={["movie", "tv", "all"]}
          func={(e) => setCategory(e.target.value)}
        />
        <div className="w-[2%]"></div>
        <Dropdown
          title="Duration"
          options={["week", "day"]}
          func={(e) => setDuration(e.target.value)}
        />
      </div>
      <InfiniteScroll
        dataLength={trending.length}
        next={getTrending}
        hasMore={hasMore}
        // loader={<h1>Loading...</h1>}
      >
        <Cards data={trending} title={category}/>
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;
