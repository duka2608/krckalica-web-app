import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import RecipeCard from "../../components/RecipeCard";
import Comments from "../../components/Comments";
import SimilarRecipes from "../../components/SimilarRecipes";

import { useSelector } from "react-redux";
import Popup from "../../components/Popup";
import LoadingPage from "../../components/LoadingPage";
import Button from "../../components/Button";

const RootDiv = styled.div`
  h2 {
    font-size: 36px;
    color: #474747;
    margin-bottom: 30px;
    line-height: 1.3;
    font-weight: 600;
  }
`;

const RecipeDate = styled.span`
  font-size: 14px;
  display: block;
  color: #a4a4a4;
  margin-bottom: 0;
`;

const RecipeInfo = styled.div`
  border-left: 3px solid #40ba37;
  padding: 15px;
  background: #f4f4f4;
  margin-bottom: 30px;

  h6 {
    color: #000000;
    line-height: 1.3;
  }
`;

const Box = styled.span`
  width: 30px;
  height: 30px;
  background-color: var(--main-green);
  margin-right: 10px;
`;

const IngredientsHeading = styled.h4`
  color: #474747;
  margin-bottom: 30px;
`;

const Recipe = () => {
  const [recipe, setRecipe] = useState({});
  const [popup, setPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);

  const { recipeId } = useParams();

  const fetchRecipe = () => {
    setLoading(true);
    axios
      .get(`http://localhost:8000/api/recipes/${recipeId}`)
      .then((response) => {
        setRecipe(response.data.recipe);
        setLoading(false);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchRecipe();
  }, [recipeId]);

  const dateFormat = (date) => {
    let newDate = new Date(date).toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

    return newDate.toString();
  };

  const addToFavoritesHandler = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8000/api/recipes/${recipeId}/favorite`, {
        user_id: user.id,
      })
      .then((res) => {
        let message = res.data.message;
        setPopup(true);
        setPopupMessage(message);
      });
  };

  const goToEditPageHandler = (e) => {
    e.preventDefault();
    window.location.href = `/user/recipe/${recipeId}/edit`;
  }

  const closePopup = () => {
    setPopup(false);
  };

  return (
    <>
      {loading && <LoadingPage />}
      {popup && <Popup closePopup={closePopup} message={popupMessage} />}
      <RootDiv>
        <div className="bg-img bg-overlay rounded text-light banner mb-5">
          <div className="row h-100 py-4">
            <div className="col-12 d-flex align-items-center justify-content-center">
              <h1 className="text-center page-title">Recept</h1>
            </div>
          </div>
        </div>
        <div className="row py-5">
          <div className="container w-70">
            <div className="col-12">
              <img
                className="card-img-top large-img fluid mb-5"
                src={
                  recipe.images
                    ? "http://localhost:8000/" +
                      recipe.images[0].path +
                      recipe.images[0].name
                    : ""
                }
                alt={recipe.name}
              />
            </div>
            <div className="row">
              <div className="col-12 col-md-8">
                <RecipeDate>{dateFormat(recipe.created_at)}</RecipeDate>
                <h2>{recipe.name}</h2>
                <RecipeInfo>
                  <h6>Priprema: {recipe.preparation_time} min</h6>
                  <h6>Broj porcija: {recipe.portions}</h6>
                  {recipe.category && (
                    <h6>Kategorija: {recipe.category.name} </h6>
                  )}
                  {recipe.cuisine && <h6>Kuhinja: {recipe.cuisine.name} </h6>}
                  {recipe.fast ? <h6>Posno</h6> : ""}
                </RecipeInfo>
                {recipe.description && (
                  <div>
                    <h2>Priprema</h2>
                    {recipe.description}
                  </div>
                )}
              </div>
              <div className="col-12 col-md-4">
                <div className="d-flex flex-column">
                  <div className="ratings align-self-end mb-4">
                    <i className="fa fa-star fa-star-lg" aria-hidden="true"></i>
                    <i className="fa fa-star fa-star-lg" aria-hidden="true"></i>
                    <i className="fa fa-star fa-star-lg" aria-hidden="true"></i>
                    <i className="fa fa-star fa-star-lg" aria-hidden="true"></i>
                    <i className="fa fa-star fa-star-lg" aria-hidden="true"></i>
                  </div>
                  {user && (
                    <div
                      onClick={user.id === recipe.user_id ? goToEditPageHandler : addToFavoritesHandler}
                      className="align-self-end"
                    >
                      <Button
                        path="#"
                        btnClass="align-self-end"
                        customStyle={{ btnWidth: "100%" }}
                      >
                        {
                          user.id === recipe.user_id ? "Izmeni" : "Dodaj u omiljene"
                        }
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-lg-8 mt-5">
                {recipe.steps &&
                  recipe.steps.map((step, index) => {
                    return (
                      <div className="d-flex" key={step.id}>
                        <h4>0{index + 1}.</h4>
                        <p className="px-4 text-justify text-muted">
                          {step.description}
                        </p>
                      </div>
                    );
                  })}
              </div>
              <div className="col-12 col-lg-4">
                <div className="ingredients">
                  <IngredientsHeading>Sastojci</IngredientsHeading>
                  {recipe.ingredients &&
                    recipe.ingredients.map((ingredient) => {
                      return (
                        <div className="d-flex mb-4" key={ingredient.id}>
                          <Box></Box>
                          <p className="d-flex align-items-center mb-0 bold">
                            {ingredient.name + " " + ingredient.amount}
                          </p>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="row">
              <Comments
                recipeId={recipeId}
                dateFormat={dateFormat}
                itemsPerPage={3}
              />
            </div>
            {recipe.category && (
              <SimilarRecipes
                categoryId={recipe.category_id}
                recipeId={recipeId}
              />
            )}
          </div>
        </div>
      </RootDiv>
    </>
  );
};

export default Recipe;
