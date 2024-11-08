import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import InfiniteScroll from "react-infinite-scroll-component";
import Dropdown from "./partials/Dropdown";
import Topnav from "./partials/Topnav";
import Loading from "./Loading";

const Movie = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("now_playing");
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  document.title = "SCSDB | Movies " + category;

  const getMovie = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);
      // setMovie(data.results);
      if (data.results.length > 0) {
        setMovie((prev) => [...prev, ...data.results]);
        setPage(page + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshHandler = () => {
    if (movie.length === 0) {
      getMovie();
    } else {
      setPage(1);
      setMovie([]);
      getMovie();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);
  
  return movie.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="w-full flex items-center p-[3%]">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line mr-2 cursor-pointer"
          ></i>
          Movie 
          <small className="text-sm ml-2 text-zinc-500">({category})</small>
        </h1>

        <Topnav />
        <Dropdown
          title="Category"
          options={["popular", "top_rated", "upcoming", "now_playing"]}
          func={(e) => setCategory(e.target.value)}
        />
      </div>
      <InfiniteScroll
        dataLength={movie.length}
        next={getMovie}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={movie} title="movie"/>
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Movie;
