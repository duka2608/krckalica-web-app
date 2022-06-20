import { useState } from "react";

import OnMenuToday from "./components/OnMenuToday";
import Popular from "./components/Popular";
import LatestRecipes from "./components/LatestRecipes";
import ParallaxBanner from "./components/ParallaxBanner";
import Popup from "../../components/Popup";
import { useSelector } from "react-redux";

const HomePage = () => {
  return (
    <>
      <div className="px-5">
        <div className="container">
          <div className="row flex-column flex-lg-row  gap-5">
            <OnMenuToday />
          </div>
          <LatestRecipes />
        </div>
      </div>
      <ParallaxBanner />
      <div className="container">
          <Popular />
      </div>
    </>
  );
};

export default HomePage;
