import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


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
        let dayDifference = Math.round(difference / (1000 * 3600 * 24));
        let hourDifference = Math.round(difference / (1000 * 3600))

        return (        
            <div className='col-12 col-md-6 col-lg-3' key={recipe.id}>
                <div className="card border rounded h-100">
                    <img className="card-img-top fluid" src={recipe.images ? "http://localhost:8000/" + recipe.images[0].path + recipe.images[0].name : '' } alt={recipe.name} />
                    <div className="card-body">
                        <h4 className="card-title">{recipe.name}</h4>
                        <p className="card-text word-break">{recipe.description}</p>
                    </div>
                    <div className='card-footer d-flex justify-content-between'>
                        <p><small className="text-muted">Objavljeno pre:  { dayDifference ? dayDifference+" dana" : hourDifference + " sati"}
                        </small></p>
                        <Link to={`/recipes/${recipe.id}`} className='btn btn-success text-light align-self-center'>Prikazi</Link>
                    </div>
                </div>
            </div>
         )
    });

    return (
        <div className="row my-5 py-3 px-2 bg-light rounded">
            <h1 className="d-flex justify-content-center mb-3">Najnoviji recepti</h1>
            <div className="card-group card-md-deck gap-5 d-flex justify-content-center">
                {recipes && displayRecipes}
            </div>
        </div>
    );
}

export default LatestRecipes;