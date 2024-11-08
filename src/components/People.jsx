import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import InfiniteScroll from "react-infinite-scroll-component";
import Dropdown from "./partials/Dropdown";
import Topnav from "./partials/Topnav";
import Loading from "./Loading";

const People = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("popular");
  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  document.title = "SCSDB | People " + category;

  const getPerson = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      // setMovie(data.results);
      if (data.results.length > 0) {
        setPeople((prev) => [...prev, ...data.results]);
        setPage(page + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshHandler = () => {
    if (people.length === 0) {
      getPerson();
    } else {
      setPage(1);
      setPeople([]);
      getPerson();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return people.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="w-full flex items-center p-[3%]">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line mr-2 cursor-pointer"
          ></i>
          People
          <small className="text-sm ml-2 text-zinc-500">({category})</small>
        </h1>

        <Topnav />
      </div>
      <InfiniteScroll
        dataLength={people.length}
        next={getPerson}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={people} title="person"/>
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default People;
