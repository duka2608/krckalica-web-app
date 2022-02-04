import { Link, Outlet } from "react-router-dom";

const RecipesLayout = () => {
  return (
    <div className="px-3 py-5">
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default RecipesLayout;