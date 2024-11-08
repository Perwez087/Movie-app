import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import InfiniteScroll from "react-infinite-scroll-component";
import Dropdown from "./partials/Dropdown";
import Topnav from "./partials/Topnav";
import Loading from "./Loading";

const Tvshows = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("airing_today");
  const [shows, setShows] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  document.title = "SCSDB | Tv Shows " + category;

  const getShow = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      // setMovie(data.results);
      if (data.results.length > 0) {
        setShows((prev) => [...prev, ...data.results]);
        setPage(page + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshHandler = () => {
    if (shows.length === 0) {
      getShow();
    } else {
      setPage(1);
      setShows([]);
      getShow();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);
  return shows.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="w-full flex items-center p-[3%]">
        <h1 className="text-2xl font-semibold text-zinc-400 w-[27%]">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line mr-2 cursor-pointer"
          ></i>
          Tv Shows
          <small className="text-sm ml-2 text-zinc-500">({category})</small>
        </h1>

        <Topnav />
        <Dropdown
          title="Category"
          options={["on_the_air", "popular", "top_rated", "airing_today"]}
          func={(e) => setCategory(e.target.value)}
        />
      </div>
      <InfiniteScroll
        dataLength={shows.length}
        next={getShow}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={shows} title="tv"/>
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Tvshows;
