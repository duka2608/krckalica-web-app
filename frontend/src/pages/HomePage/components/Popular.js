import SmallRecipeCard from "../../../components/SmallRecipeCard";
import { useEffect, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';
import LoadingPage from "../../../components/LoadingPage";

const PopularWrapper = styled.div`
    display: flex;
    max-width: 80%;
    justify-content: center;
    margin: 0 auto;
`;

const Popular = () => {
    const [loading, setLoading] = useState(false);
    const [recipes, setRecipes] = useState([]);

    const fetchRecipes = () => {
        axios.get('http://localhost:8000/api/recipes/popular')
        .then((response) => {
            setRecipes(response.data);
        });
    }

    useEffect(() => {
        fetchRecipes();
        console.log(recipes);
    }, []);

    const displayRecipes = recipes.map(recipe => {
        let createdDate = new Date(recipe.created_at);
        let options = { month: 'long', day: 'numeric', year: 'numeric' }
        let fullDate = createdDate.toLocaleString("en-US", options);

        return (
          <SmallRecipeCard
            key={recipe.id}
            id={recipe.id}
            name={recipe.name}
            date={fullDate}
            path={
                recipe.images
                  ? "http://localhost:8000/" +
                    recipe.images[0].path +
                    recipe.images[0].name
                  : ""
              }
            comments={recipe.commentCount}
          />
        );
    });

    return(
        <>
            {loading && <LoadingPage />}
            <PopularWrapper className="row">
                {recipes && displayRecipes}
            </PopularWrapper>
        </>
    );
}

export default Popular;