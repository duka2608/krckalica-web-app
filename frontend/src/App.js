import "./App.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage/HomePage";

import { Routes, Route, Navigate } from "react-router-dom";
import Recipes from "./pages/Recipes/Recipes";
import Recipe from "./pages/Recipes/Recipe";
import RecipesLayout from "./pages/Recipes/RecipesLayout";

function App() {
  return (
    <div className="App">
      <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route exact path="/recipes" element={<RecipesLayout />}>
            <Route path="all" element={<Recipes />}/>
            <Route path=":recipeId" element={<Recipe />}/>
            <Route
              path="/recipes"
              element={<Navigate to="all" />}
            />
          </Route>
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
