import OnMenuToday from "./components/OnMenuToday";
import Popular from "./components/Popular";
import LatestRecipes from "./components/LatestRecipes";

const HomePage = () => {
    return (
        <div className="px-5">
            <div className="container">
                <div className="row flex-column flex-lg-row  gap-5">
                    <OnMenuToday />
                    <Popular />
                </div>
                <LatestRecipes />
            </div>
        </div>
    );
};

export default HomePage;