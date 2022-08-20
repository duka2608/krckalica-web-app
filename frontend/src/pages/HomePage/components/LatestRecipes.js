import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import RecipeCard from '../../../components/RecipeCard';


const LatestRecipes = () => {
    const [recipes, setRecipes] = useState([]);

    const fetchRecipes = () => {
        axios.get('http://localhost:8000/api/recipes/latest')
        .then((response) => {
            setRecipes(response.data);
        });
    }

    useEffect(() => {
        fetchRecipes();
    }, []);

    const displayRecipes = recipes.map((recipe) => {
        let created = new Date(recipe.created_at);
        let currentDate = new Date();

        let difference = currentDate.getTime() - created.getTime();
        let dayDifference = Math.round(Math.abs(difference / (1000 * 3600 * 24)));
        let hourDifference = Math.round(Math.abs(difference / (1000 * 3600)))
        let minuteDifference = Math.round(Math.abs(difference / (1000 * 60)));

        return (        
            <div className='col-12 col-md-6 col-lg-3' key={recipe.id}>
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
                difference={true}
                dayDifference={dayDifference}
                hourDifference={hourDifference}
                minuteDifference={minuteDifference}
                />
            </div>
         )
    });
    return (
        <div className="row my-5 py-4 px-2 bg-light rounded">
            <h1 className="d-flex justify-content-center mb-4">Najnoviji recepti</h1>
            <div className="card-group card-md-deck gap-5 d-flex justify-content-center">
                {recipes && displayRecipes}
            </div>
        </div>
    );
}

export default LatestRecipes;            