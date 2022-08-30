import { useState } from "react";

import OnMenuToday from "./components/OnMenuToday";
import Popular from "./components/Popular";
import LatestRecipes from "./components/LatestRecipes";
import ParallaxBanner from "./components/ParallaxBanner";
import Popup from "../../components/Popup";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../../actions/userActions";

const HomePage = () => {
  const message = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const closePopup = () => {
    dispatch(clearMessage());
  };

  return (
    <>
      {message && <Popup message={message} closePopup={closePopup} />}
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
