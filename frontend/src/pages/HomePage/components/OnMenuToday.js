import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LoadingPage from '../../../components/LoadingPage';

const RecipeInfo = styled.div`
    background-color: rgba(0, 0, 0, 0.4);
    max-width: 50%;
    height: fit-content;
    border-radius: initial;
    position: absolute;
    top: 50%;
    left: 30%;
    transform: translate(-50%, -50%);
    color: #FFF;
    padding: 2rem 2rem;
    border-left: 3px solid var(--border-green-light);
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;

    h2 {
        font-weight: 600;
        opacity: 0.9;
        margin-bottom: 2rem;
    }

    p {
        font-size: 16px;
        line-height: 28px;
    }

    @media (max-width: 991px) {
        max-width: 100%;
        left: 50%;

        h2 {
            font-size: 20px;
        }
    }
`;

const OnMenuToday = () => {
    const [loading, setLoading] = useState(false);
    const [recipe, setRecipe] = useState({});

    const fetchRecipe = () => {
        setLoading(true)

       axios
        .get("http://localhost:8000/api/recipes/today-on-menu")
        .then(function (response) {
            setRecipe(response.data);
            setLoading(false)
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
            {loading && <LoadingPage />}
            <div className='col pt-5'>
                <div className="card bg-light text-dark">
                    <img className="card-img img-fluid height-img" src={recipe.images ? "http://localhost:8000/" + recipe.images[0].path + recipe.images[0].name : '' } alt={recipe.name} />
                    <RecipeInfo className="card-img-overlay">
                        <h2 className="card-title">{recipe.name}</h2>
                        <p className="card-text">{recipe.description}</p>
                        {recipe.user && <p className="card-text">Autor: {recipe.user.first_name+' '+recipe.user.last_name}</p>}
                        <Link to={`/recipes/${recipe.id}`} className='btn green-btn'>
                            Pogledaj recept
                        </Link>
                    </RecipeInfo>
                </div>
            </div>
        </>
    );
}

export default OnMenuToday;