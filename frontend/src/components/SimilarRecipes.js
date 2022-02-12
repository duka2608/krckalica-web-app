import { useState, useEffect } from "react";
import axios from "axios";

import RecipeCard from "./RecipeCard";

const SimilarRecipes = ({ categoryId, recipeId }) => {
  const [similarRecipes, setSimilarRecipes] = useState([]);

  const fetchSimilar = () => {
    axios
      .post(`http://localhost:8000/api/recipes/category/${categoryId}`, {
        limit: 4,
        recipe: recipeId,
      })
      .then((response) => {
        setSimilarRecipes(response.data.recipes);
      });
  };

  useEffect(() => {
    fetchSimilar();
  }, [recipeId]);

  const RecipesDisplay = similarRecipes.map((recipe) => {
    return (
      <div className="col-12 col-md-6 col-lg-3" key={recipe.id}>
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
    <div className="row">
      {similarRecipes.length > 0 ? (
        <>
          <div className="col-12 my-3 text-center">
            <h2>Recepti iz slične kategorije</h2>
          </div>
          {RecipesDisplay}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default SimilarRecipes;
