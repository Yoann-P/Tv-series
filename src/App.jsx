import s from "./style.module.css";
import { useEffect, useState } from "react";
import { TVShowAPI } from "./api/tv-show";
import { Logo } from "./components/Logo/Logo";
import { TVShowDetails } from "./components/TvShowDetails/TVShowDetails";

import { TVShowList } from "./components/TVShowList/TVShowlist";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { BACKDROP_BASE_URL } from "./config";
import logo from "./assets/images/logo.png";

// console.log(TVShowAPI.fetchPopulars);
// TVShowAPI.fetchRecommendations(100088);

export function App() {
  const [currentTVShow, setCurrentTVShow] = useState();
  const [recommendations, setRecommendations] = useState([]);

  async function fetchPopulars() {
    try {
      const populars = await TVShowAPI.fetchPopulars();
      if (populars.length > 0) {
        setCurrentTVShow(populars[0]);
      }
    } catch (error) {
      alert("Erreur lors du chargement du site" + error.message);
    }
  }

  async function fetchRecommendations(tvShowId) {
    try {
      const recommendations = await TVShowAPI.fetchRecommendations(tvShowId);
      if (recommendations.length > 0) {
        setRecommendations(recommendations.slice(0, 10));
      }
    } catch (error) {
      alert("Erreur lors de la recheche de recommendations" + error.message);
    }
  }

  useEffect(() => {
    fetchPopulars();
  }, []);

  useEffect(() => {
    if (currentTVShow) {
      fetchRecommendations(currentTVShow.id);
    }
  }, [currentTVShow]);

  console.log(currentTVShow);

  async function searchTVShow(tvShowName) {
    try {
      const searchReponse = await TVShowAPI.fetchByTitle(tvShowName);
      if (searchReponse.length > 0) {
        setCurrentTVShow(searchReponse[0]);
      }
    } catch (erreur) {
      alert("Erreur lors de la recherche du titre" + erreur.message);
    }
  }
  // function setCurrentTvShowFromRecommanddation(tvShow) {
  //   alert(JSON.stringify(tvShow));
  // }

  console.log(recommendations);

  return (
    <div
      className={s.main_container}
      style={{
        background: currentTVShow
          ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`
          : "black",
      }}
    >
      <div className={s.header}>
        <div className="row">
          <div className="col-4">
            <Logo
              image={logo}
              title="WhatToWatch"
              subtitle="Find a Show you May Like"
            />
          </div>
          <div className="col-md-12 col-lg-4">
            <SearchBar onSubmit={searchTVShow} />
          </div>
        </div>
      </div>
      <div className={s.tv_show_details}>
        {currentTVShow && <TVShowDetails tvShow={currentTVShow} />}
      </div>
      <div className={s.recommended_shows}>
        {recommendations && recommendations.length > 0 && (
          <TVShowList
            onClickItem={setCurrentTVShow}
            tvShowList={recommendations}
          />
        )}
      </div>
    </div>
  );
}
