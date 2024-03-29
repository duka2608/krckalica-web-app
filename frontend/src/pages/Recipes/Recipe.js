import { useParams, Link, useNavigate } from "react-router-dom";
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
    margin-bottom: 5px;
    line-height: 1.3;
    font-weight: 600;
  }

  h5 {
    margin-bottom: 10px;
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

const AdviceParagraph = styled.p`
  white-space: pre-line;
  font-size: 18px;
  line-height: 31px;
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
  const [deleteState, setDeleteState] = useState(false);
  const user = useSelector((state) => state.user);

  const { recipeId } = useParams();
  const navigate = useNavigate();

  const fetchRecipe = () => {
    setLoading(true);
    axios
      .get(`http://krckalica-web-app-backend.herokuapp.com/api/recipes/${recipeId}`)
      .then((response) => {
        setRecipe(response.data.recipe);
        console.log(response)
        setLoading(false);
      });
  };

  const registerRecipeView = () => {
    axios.post(`http://krckalica-web-app-backend.herokuapp.com/api/recipes/popular/${recipeId}`)
    .then((response) => {
        console.log(response);
    });
}

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchRecipe();
    registerRecipeView();
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

  const addToFavoritesHandler = () => {
    axios
      .post(`http://krckalica-web-app-backend.herokuapp.com/api/recipes/${recipeId}/favorite`, {
        user_id: user.id,
      })
      .then((res) => {
        let message = res.data.message;
        setPopup(true);
        setPopupMessage(message);
      });
  };

  const deleteRecipeHandler = () => {
    if (recipe.user_id !== user.id) {
      return;
    }

    setDeleteState(true);
    const token = localStorage.getItem("access_token");

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    setLoading(true);

    axios
      .delete(`http://krckalica-web-app-backend.herokuapp.com/api/recipes/${recipeId}`, config)
      .then((res) => {
        let message = res.data.message;
        setPopup(true);
        setLoading(false);
        setPopupMessage(message);
      });
  };

  const goToEditPageHandler = () => {
    navigate(`/user/recipe/${recipeId}/edit`);
    // window.location.href = `/user/recipe/${recipeId}/edit`;
  };

  const closePopup = () => {
    setPopup(false);
    if (deleteState) {
      navigate("/user/profile");
      setDeleteState(false);
    }
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
                    ?
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
                <h5>Autor: {recipe.user?.first_name+" "+recipe.user?.last_name}</h5>

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
                  <div className="mb-3">
                    <h2>Opis</h2>
                    <p>{recipe.description}</p>
                  </div>
                )}
              </div>
              <div className="col-12 col-md-4">
                <div className="d-flex flex-column">
                  {user && (
                    <div className="d-flex justify-content-between align-self-end">
                      <Button
                        path="#"
                        btnClass="mr-3"
                        customStyle={{ btnWidth: "100%" }}
                        action={
                          user.id === recipe.user_id
                            ? goToEditPageHandler
                            : addToFavoritesHandler
                        }
                      >
                        {user.id === recipe.user_id
                          ? "Izmeni"
                          : "Dodaj u omiljene"}
                      </Button>
                      {user.id === recipe.user_id && (
                        <Button
                          path="#"
                          customStyle={{
                            btnWidth: "90%",
                            background: "#F00",
                            hoverBackground: "#700707",
                            border: "3px solid #700707",
                            hoverColor: "#FFF !important",
                            margin: "0 10px",
                          }}
                          action={deleteRecipeHandler}
                        >
                          Ukloni
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-lg-8 mt-5">
              {recipe.advice && (
                  <div>
                    <h2>Priprema</h2>
                    <AdviceParagraph>{recipe.advice}</AdviceParagraph>
                  </div>
                )}
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
