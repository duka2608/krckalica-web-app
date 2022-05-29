import "./App.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage/HomePage";

import { Routes, Route, Navigate } from "react-router-dom";
import Recipes from "./pages/Recipes/Recipes";
import Recipe from "./pages/Recipes/Recipe";
import RecipesLayout from "./pages/Recipes/RecipesLayout";
import RecipesByCategory from "./pages/Recipes/RecipesByCategory";
import RecipesByCuisine from "./pages/Recipes/RecipesByCuisine";
import Registration from "./pages/Registration/Registration";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "./actions/userActions";
import UserPage from "./pages/UserProfile/UserPage";
import NewRecipe from "./pages/NewRecipe/NewRecipe";
import EditRecipe from "./pages/EditRecipe/EditRecipe";


function App() {
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  
  useEffect(() => {
    setUser(dispatch(loadUser()));
  }, [user]);


  return (
    <div className="App">
      <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route exact path="/recipes" element={<RecipesLayout />}>
            <Route path="all" element={<Recipes />}/>
            <Route path=":recipeId" element={<Recipe />}/>
            <Route path="/recipes/category/:categoryId" element={<RecipesByCategory />}/>
            <Route path="/recipes/cuisine/:cuisineId" element={<RecipesByCuisine />}/>
            <Route
              path="/recipes"
              element={<Navigate to="all" />}
            />
          </Route>
          <Route path="/user/profile" element={<UserPage />} />
          <Route path="/user/new-recipe" element={<NewRecipe />} />
          <Route path="/user/recipe/:recipeId/edit" element={<EditRecipe />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
