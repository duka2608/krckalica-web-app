import { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "../../components/RecipeCard";


const FavoriteRecipes = ({ id }) => {
    const [recipes, setRecipes] = useState([]);

    const fetchUserRecipes = () => {
        axios
          .get(`http://localhost:8000/api/user/${id}/recipes/favorite`)
          .then((res) => 
          setRecipes(res.data));
      };
    
      useEffect(() => {
        fetchUserRecipes();
      }, []);
    
      const favRecipes = recipes.map((recipe) => {
        return (
          <div className="col-12 col-sm-6 col-lg-3" key={recipe.recipe.id}>
            <RecipeCard
              id={recipe.recipe.id}
              name={recipe.recipe.name}
              path={
                recipe.recipe.image
                  ? "http://localhost:8000/" +
                    recipe.recipe.image[0].path +
                    recipe.recipe.image[0].name
                  : ""
              }
              rating={false}
            />
          </div>
        );
      });
    
      return (
          <>
            {favRecipes}
          </>
      )
}

export default FavoriteRecipes;