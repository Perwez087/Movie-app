import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import InfiniteScroll from "react-infinite-scroll-component";
import Dropdown from "./partials/Dropdown";
import Topnav from "./partials/Topnav";
import Loading from "./Loading";

const Popular = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("movie");
  const [popular, setPopular] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  document.title = "SCSDB | Popular " + category.toLocaleUpperCase()

  const getPopular = async () => {
    try {
      const { data } = await axios.get(`${category}/popular?page=${page}`);
      if (data.results.length > 0) {
        setPopular((prev) => [...prev, ...data.results]);
        setPage(page + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshHandler = () => {
    if (popular.length === 0) {
      getPopular();
    } else {
      setPage(1);
      setPopular([]);
      getPopular();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  // console.log(popular);

  return popular.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="w-full flex items-center p-[3%]">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line mr-2 cursor-pointer"
          ></i>
          Popular
          <small className="text-sm ml-2 text-zinc-500">({category})</small>
        </h1>

        <Topnav />
        <Dropdown
          title="Category"
          options={["tv", "movie"]}
          func={(e) => setCategory(e.target.value)}
        />
      </div>
      <InfiniteScroll
        dataLength={popular.length}
        next={getPopular}
        hasMore={hasMore}
        // loader={<h1>Loading...</h1>}
      >
        <Cards data={popular} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Popular;
