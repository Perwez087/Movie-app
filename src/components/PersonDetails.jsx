import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "./Loading";
import { asynccloadpeople, removepeople } from "../store/actions/personActions";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";

const PersonDetails = () => {
  const { pathname } = useLocation();
  // console.log(pathname);
  const navigate = useNavigate();
  const [category, setCategory] = useState("movie");
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();
  console.log(info);

  useEffect(() => {
    dispatch(asynccloadpeople(id));
    return () => {
      dispatch(removepeople());
    };
  }, [id]);
  return info ? (
    <div className="p-[5%] w-screen h-[200vh] flex flex-col bg-black">
      {/* Part - 1 Link */}
      <nav className="w-full text-zinc-300 flex items-center gap-10 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line"
        ></Link>
      </nav>

      <div className="w-full flex">
        <div className="w-[20%]">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] object-cover"
            src={`https://image.tmdb.org/t/p/original/${info.details.profile_path}`}
            alt="poster"
          />

          <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />
          {/* Social Media Links */}
          <div className="text-2xl text-white flex gap-x-10">
            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <i className="ri-earth-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}/`}
            >
              <i className="ri-facebook-circle-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}/`}
            >
              <i className="ri-instagram-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://twitter.com/${info.externalid.twitter_id}/`}
            >
              <i className="ri-twitter-x-fill"></i>
            </a>
          </div>
          {/* Personal Information */}
          <h1 className="text-2xl text-zinc-400 font-semibold my-5">
            Person Info
          </h1>
          <h1 className="text-xl text-zinc-400 font-semibold">Known For</h1>
          <h1 className="text-zinc-400">{info.details.known_for_department}</h1>
          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Gender</h1>
          <h1 className="text-zinc-400">
            {info.details.gender === 2 ? "Male" : "Female"}
          </h1>
        </div>

        {/* Part 3 right Details and Information */}
        <div className="w-[80%] ml-[5%]">
          <h1 className="text-2xl text-zinc-400 font-black">
            {info.details.name}
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold">Biography</h1>
          <p className="text-zinc-400">{info.details.biography}</p>
          <h1 className="text-lg text-zinc-400 font-semibold mt-5">
            Known For
          </h1>
          <HorizontalCards data={info.combinedCredits.cast} />

          <div className="w-full flex justify-between">
            <h1 className="mt-5 text-xl text-zinc-400 font-semibold">Acting</h1>
            <Dropdown
              title="Category"
              options={["tv", "movie"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="list-disc text-zinc-400 w-full h-[50vh] overflow-x-hidden mt-5 overflow-y-auto shadow-xl shadow-[rgba(255,255,255,.3)] border-2 border-zinc-700 p-5">
            {info[category + "Credits"].map((c,i) => (
              <li key={i} className="hover:text-white duration-300 cursor-pointer mb-5">
                <Link to={`/${category}/details/${c.id}`} className="">
                   <span>
                    {c.name || c.title || c.original_name || c.original_title}
                   </span>

                   <span className="block">
                     {c.character && `Character name : ${c.character}`}
                   </span>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PersonDetails;
