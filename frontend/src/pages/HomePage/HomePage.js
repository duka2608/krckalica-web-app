import OnMenuToday from "./components/OnMenuToday";
import Popular from "./components/Popular";
import LatestRecipes from "./components/LatestRecipes";
import ParallaxBanner from "./components/ParallaxBanner";

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
