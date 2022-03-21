import { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "../../components/RecipeCard";
import LoadingPage from '../../components/LoadingPage';


const UserRecipes = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [userRecipes, setUserRecipes] = useState([]);

  const fetchUserRecipes = () => {
    axios
      .get(`http://localhost:8000/api/user/${id}/recipes`)
      .then((res) => {
        setUserRecipes(res.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchUserRecipes();
  }, []);

  const recipes = userRecipes.map((recipe) => {
    return (
      <div className="col-12 col-sm-6 col-lg-3" key={recipe.id}>
        <RecipeCard
          id={recipe.id}
          name={recipe.name}
          path={
            recipe.images
              ? "http://localhost:8000/" +
                recipe.images[0].path +
                recipe.images[0].name
              : ""
          }
          rating={false}
        />
      </div>
    );
  });

  return (
      <>
        {loading && <LoadingPage />}
        {recipes}
      </>
  )
};

export default UserRecipes;
