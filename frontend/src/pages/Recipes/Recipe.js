import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const RecipeHeading = styled.h2`
  font-size: 36px;
  color: #474747;
  margin-bottom: 30px;
  line-height: 1.3;
  font-weight: 600;
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

const CommentBox = styled.div`
    border-left: 3px solid #40ba37;
    padding: 15px;
    background-color: #f4f4f4;
    margin-bottom: 20px;
`;

const Recipe = () => {
  const [recipe, setRecipe] = useState({});
  const { recipeId } = useParams();

  const fetchRecipe = () => {
    axios
      .get(`http://localhost:8000/api/recipes/${recipeId}`)
      .then((response) => {
          console.log(response.data);
        setRecipe(response.data);
      });
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  const dateFormat = new Date(recipe.created_at).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <>
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
              <RecipeDate>{dateFormat.toString()}</RecipeDate>
              <RecipeHeading>{recipe.name}</RecipeHeading>
              <RecipeInfo>
                <h6>Priprema: {recipe.preparation_time} min</h6>
                <h6>Broj porcija: {recipe.portions}</h6>
                {recipe.category && (
                  <h6>Kategorija: {recipe.category.name} </h6>
                )}
                {recipe.cuisine && <h6>Kuhinja: {recipe.cuisine.name} </h6>}
                {recipe.fast ? <h6>Posno</h6> : ""}
              </RecipeInfo>
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
                <a href="#" className="btn green-btn align-self-end">
                  Lako
                </a>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-lg-8 mt-5">
                {recipe.steps && recipe.steps.map((step, index) => {
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
              <div className="col-12 col-lg-8">
                  <RecipeHeading>Komentari</RecipeHeading>
                  <div>
                    {recipe.comments && recipe.comments.map((comment) => {
                        return (
                            <CommentBox key={comment.id}>
                                <p>{comment.content}</p>
                            </CommentBox>
                        );
                    })}
                  </div>
              </div>
              <div className="col-12 col-lg-4"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Recipe;
