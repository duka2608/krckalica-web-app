import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import RecipeCard from "../../components/RecipeCard";

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

  h4 {
    font-weight: 600;
    color: #474747;
    margin-top: 0.5rem;
  }

  p {
    margin-top: 15px;
  }

  span {
    font-size: 12px;
    color: #c8c8c8;
  }

`;

const Recipe = () => {
  const [recipe, setRecipe] = useState({});
  const [comments, setComments] = useState([]);
  const [similar, setSimilar] = useState([]);
  const { recipeId } = useParams();

  const fetchRecipe = () => {
    axios
      .get(`http://localhost:8000/api/recipes/${recipeId}`)
      .then((response) => {
        setRecipe(response.data.recipe);
        setComments(response.data.comments);
        fetchSimilar(response.data.recipe.category_id);
      });
  };

  const fetchSimilar = (categoryId) => {
    axios.post(`http://localhost:8000/api/recipes/category/${categoryId}`, { limit: 4, recipe: recipeId } )
    .then((response) => {
      console.log(response);
      setSimilar(response.data);
    });
  }

  useEffect(() => {
    fetchRecipe();
  }, []);

  const dateFormat = (date) => {
    let newDate = new Date(date).toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    return newDate.toString();
  };

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
              <RecipeDate>{dateFormat(recipe.created_at)}</RecipeDate>
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
            <div className="col-12 col-lg-8 mt-3">
              <RecipeHeading>Komentari</RecipeHeading>
              <div className="mb-4">
                  <form>
                    <div className="form-group mb-3">
                      <label className="text-muted" htmlFor="exampleFormControlTextarea1">Vaš komentar</label>
                      <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <div className="d-flex justify-content-center">
                      <button type="submit" className="btn form-btn">Pošalji</button>
                    </div>
                  </form>
              </div>
              <div>
                {comments &&
                  comments.map((comment) => {
                    return (
                      <CommentBox key={comment.id}>
                        <h4>
                          {comment.user.first_name +
                            " " +
                            comment.user.last_name}
                        </h4>
                        <p>{comment.content}</p>
                        <span>{dateFormat(comment.created_at)}</span>
                      </CommentBox>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 my-3 text-center">
              <RecipeHeading>Recepti iz slične kategorije</RecipeHeading>
            </div>
              {similar && similar.map((recipe) => {
                return (
                  <div className="col-12 col-md-6 col-lg-3" key={recipe.id}>
                  <RecipeCard 
                    id={recipe.id}
                    name={recipe.name}
                    path={recipe.images ? "http://localhost:8000/" + recipe.images[0].path + recipe.images[0].name : '' }
                    rating={false}

                  />
                </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Recipe;
