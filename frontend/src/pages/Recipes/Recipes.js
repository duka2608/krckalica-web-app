import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";

import styled from "styled-components";


const RecipeContainer = styled.div`
    margin-bottom: 30px;

    img {
        max-width: 100%;
        border-bottom: 3px solid var(--main-green);
    }

    .recipe-content {
        padding-top: 30px;
        text-align: center;
    }

    .link {
        transition-duration: 500ms;
        outline: 0 solid transparent;
        font-weight: 600;
        font-size: 16px;
        color: #474747;

        h5 {
            font-size: 18px;
            font-weight: 400;
            margin-bottom: 10px;
            transition-duration: 500ms;

            :hover {
                color: var(--main-green);
            }
        }
    }

`;

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);

    const fetchRecipes = () => {
        axios.get('http://localhost:8000/api/recipes/all')
        .then((response) => {
            setRecipes(response.data);
        });
    }


    useEffect(() => {
        fetchRecipes();
    }, []);

    const displayRecipes = recipes.map((recipe) => {
        return (
            <div className="col-12 col-sm-6 col-lg-3" key={recipe.id}>
                <RecipeContainer>
                    <img className="card-img-top fluid" src={recipe.images ? "http://localhost:8000/" + recipe.images[0].path + recipe.images[0].name : '' } alt={recipe.name} />
                    <div className="recipe-content">
                        <Link className="link" to={`/recipes/${recipe.id}`}>
                            <h5>{recipe.name}</h5>
                        </Link>
                        <div className="ratings">
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                        </div>
                    </div>
                </RecipeContainer>
            </div>
        );
    });

    return (
        <>
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
