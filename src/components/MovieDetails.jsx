import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asynccloadmovie, removemovie } from "../store/actions/movieActions";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "./partials/HorizontalCards";

const MovieDetails = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  const dispatch = useDispatch();
  // console.log(info);

  useEffect(() => {
    dispatch(asynccloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [id]);
  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${info.details.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="relative w-screen h-[150vh] px-[10%]"
    >
      {/* Part - 1 Link */}
      <nav className="h-[10vh] w-full text-zinc-300 flex items-center gap-10 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line"
        ></Link>
        <a target="_blank" href={info.details.homepage}>
          <i className="ri-external-link-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
        >
          imdb
        </a>
      </nav>

      {/* Part - 2 Poster and details */}
      <div className="flex">
        <div className="w-full">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] object-cover"
            src={`https://image.tmdb.org/t/p/original/${
              info.details.poster_path || info.details.backdrop_path
            }`}
            alt="poster"
          />

          {/* Part - 3 Available on Platform */}

          <div className="w-[80%]">
            <div className="mt-5 flex flex-col gap-4 whitespace-nowrap">
              {info.watchproviders && info.watchproviders.flatrate && (
                <div className="flex gap-5 items-center text-zinc-300">
                  <h1>Available on Platforms</h1>
                  {info.watchproviders.flatrate.map((w) => (
                    <img
                      title={w.provider_name}
                      className="w-[5vh] h-[5vh] object-cover rounded-md"
                      src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                    />
                  ))}
                </div>
              )}

              {info.watchproviders && info.watchproviders.rent && (
                <div className="flex gap-4 items-center text-zinc-300">
                  <h1>Available on Rent</h1>
                  {info.watchproviders.rent.map((w) => (
                    <img
                      title={w.provider_name}
                      className="w-[5vh] h-[5vh] object-cover rounded-md"
                      src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                    />
                  ))}
                </div>
              )}

              {info.watchproviders && info.watchproviders.buy && (
                <div className="flex gap-5 items-center text-zinc-300">
                  <h1>Available to Buy</h1>
                  {info.watchproviders.buy.map((w) => (
                    <img
                      title={w.provider_name}
                      className="w-[5vh] h-[5vh] object-cover rounded-md"
                      src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* content   */}

        <div className="content text-white white mb-10">
          <h1 className="text-5xl font-black">
            {info.details.name ||
              info.details.title ||
              info.details.original_name ||
              info.details.original_title}

            <small className="text-2xl text-zinc-300 font-bold">
              ({info.details.release_date.split("-")[0]})
            </small>
          </h1>

          <div className="flex items-center gap-x-5 mb-5 mt-4">
            <span className="rounded-full text-lg font-semibold bg-yellow-600 text-white w-[6vh] h-[6vh] flex justify-center items-center">
              {(info.details.vote_average * 10).toFixed()}
              <sup>%</sup>
            </span>
            <h1 className="font-semibold text-2xl w-[60px] leading-7">
              User Score
            </h1>
            <h1>{info.details.release_date}</h1>
            <h1>{info.details.genres.map((g) => g.name).join(", ")}</h1>
            <h1>{info.details.runtime} min</h1>
          </div>

          <h1 className="text-xl font-semibold italic">
            {info.details.tagline}
          </h1>

          <h1 className="text-xl mt-5 mb-3">Overview</h1>
          <p>{info.details.overview}</p>

          <h1 className="text-xl mt-5 mb-3">Movie Translated</h1>
          <p className="mb-10">{info.translations.join(", ")}</p>

          <Link
            to={`${pathname}/trailer`}
            className="py-3 px-5 bg-[#6556CD] rounded-lg"
          >
            <i className="ri-play-fill mr-3"></i>
            Play Trailer
          </Link>
        </div>
      </div>
      {/* Part - 4 Recommendations & Similar */}
      <hr className="mt-10 mb-5 border-none h-[1px] bg-zinc-500" />
      <h1 className="text-2xl font-bold text-white">
        Recommendations & Similar
      </h1>
      <HorizontalCards
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      />
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetails;
