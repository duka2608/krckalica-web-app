import { useState, useEffect } from 'react';
import axios from 'axios';

const OnMenuToday = () => {
    const [recipe, setRecipe] = useState({});

    const fetchRecipe = async() => {
       axios
        .get("http://localhost:8000/api/get-on-menu-today")
        .then(function (response) {
            console.log(response.data);
            setRecipe(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    useEffect(() => {
        fetchRecipe();
    }, []);

    return(
        <>
            <div className='col pt-5'>
                <div className="card bg-light text-dark">
                    <img className="card-img img-fluid" src={recipe.images ? "http://localhost:8000/" + recipe.images[0].path + recipe.images[0].name : '' } alt={recipe.name} />
                    <div className="card-img-overlay p-3">
                        <h1 className="card-title">{recipe.name}</h1>
                        <p className="card-text">{recipe.description}</p>
                        {recipe.user && <p className="card-text">Autor: {recipe.user.first_name+' '+recipe.user.last_name}</p>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default OnMenuToday;