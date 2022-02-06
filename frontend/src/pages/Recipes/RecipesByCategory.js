import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import RecipeCard from "../../components/RecipeCard";

const RecipesByCategory = () => {
    const { categoryId } = useParams();
    const [recipes, setRecipes] = useState([]);
    const [category, setCategory] = useState('');

    const fetchRecipes = () => {
        axios.post(`http://localhost:8000/api/recipes/category/${categoryId}`, { limit: 10 })
        .then((response) => {
            console.log(response);
            setRecipes(response.data.recipes);
            setCategory(response.data.category);
        });
    }


    useEffect(() => {
        fetchRecipes();
    }, [categoryId]);

    const displayRecipes = recipes.map((recipe) => {
        return (
            <div className="col-12 col-sm-6 col-lg-3" key={recipe.id}>
                <RecipeCard 
                    id={recipe.id}
                    name={recipe.name}
                    path={recipe.images ? "http://localhost:8000/" + recipe.images[0].path + recipe.images[0].name : '' }
                    rating={true}
                />
            </div>
        );
    });

    return (
        <>
            <div className="bg-img bg-overlay rounded text-light banner mb-5">
                <div className="row h-100 py-4">
                    <div className="col-12 d-flex align-items-center justify-content-center">
                        <h1 className="text-center page-title">{category.name}</h1>
                    </div>
                </div>
            </div>
            <div className="row">
                {recipes && displayRecipes}
            </div>
        </>
    );
}

export default RecipesByCategory;