import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import RecipeCard from "../../components/RecipeCard";
import LoadingPage from "../../components/LoadingPage";


const Recipes = () => {
    const [loading, setLoading] = useState(true);
    const [recipes, setRecipes] = useState([]);

    const fetchRecipes = () => {
        axios.get('http://krckalica-web-app-backend.herokuapp.com/api/recipes/all')
        .then((response) => {
            setRecipes(response.data);
            setLoading(false);
        });
    }

    useEffect(() => {
        fetchRecipes();
    }, []);

    const displayRecipes = recipes.map((recipe) => {
        return (
            <div className="col-12 col-sm-6 col-lg-3" key={recipe.id}>
                <RecipeCard 
                    id={recipe.id}
                    name={recipe.name}
                    path={recipe.images ? recipe.images[0].path + recipe.images[0].name : '' }
                    rating={true}
                />
            </div>
        );
    });

    return (
        <>
            {loading && <LoadingPage/>}
            <div className="bg-img bg-overlay rounded text-light banner mb-5">
                <div className="row h-100 py-4">
                    <div className="col-12 d-flex align-items-center justify-content-center">
                        <h1 className="text-center page-title">Recepti</h1>
                    </div>
                </div>
            </div>
            <div className="row">
                {recipes && displayRecipes}
            </div>
        </>
    );
};

export default Recipes;
