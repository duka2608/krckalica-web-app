import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import CustomSelect from "../../components/CustomSelect";
import InputField from "../../components/InputField";
import axios from "axios";
import LoadingPage from "../../components/LoadingPage";
import { useSelector } from "react-redux";
import Popup from "../../components/Popup";
import { useNavigate, useParams } from "react-router-dom";
import IngredientsInput from "../NewRecipe/components/IngredientsInput";

const Container = styled.div`
  margin: 0 auto;
  max-width: 50%;

  h2 {
    font-size: 36px;
    color: #474747;
    margin-bottom: 30px;
    line-height: 1.3;
    font-weight: 600;
  }

  .form-group {
    margin: 20px 0px;
  }

  @media only screen and (max-width: 991px) {
    max-width: 80%;
  }
`;

const EditRecipe = () => {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [categories, setCategories] = useState([]);
  const [cuisines, setCuisines] = useState([]);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState(0);
  const [cuisine, setCuisine] = useState(0);
  const [advice, setAdvice] = useState("");
  const [prep, setPrep] = useState("");
  const [portions, setPortions] = useState("");
  const [fast, setFast] = useState(false);
  const [image, setImage] = useState("");
  const [tempImg, setTempImg] = useState("");
  const [ingredients, setIngredients] = useState([{ name: "", amount: "" }]);

  const [nameError, setNameError] = useState("");
  const [descError, setDescError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [cuisineError, setCuisineError] = useState("");
  const [prepError, setPrepError] = useState("");
  const [portionError, setPortionError] = useState("");

  const [popup, setPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({});
  const { recipeId } = useParams();

  const fetchRecipe = () => {
    setLoading(true);
    axios
      .get(`http://krckalica-web-app-backend.herokuapp.com/api/recipes/${recipeId}`)
      .then((response) => {
        let recipe = response.data.recipe;

        if(recipe.user_id !== user.id) {
          navigate("/");
        }

        setRecipe(recipe);
        setName(recipe.name);
        setDesc(recipe.description);
        setAdvice(recipe.advice);
        setCategory(recipe.category_id);
        setCuisine(recipe.cuisine_id);
        setPrep(recipe.preparation_time);
        setPortions(recipe.portions);
        setIngredients(response.data.recipe.ingredients);
        setLoading(false);
      });
  };

  const fetchCategories = () => {
    setLoading(true);
    axios
      .get("http://krckalica-web-app-backend.herokuapp.com/api/categories")
      .then(function (response) {
        setCategories(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const fetchCuisines = () => {
    setLoading(true);
    axios
      .get("http://krckalica-web-app-backend.herokuapp.com/api/cuisines")
      .then(function (response) {
        setCuisines(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCategories();
    fetchCuisines();
    fetchRecipe();
  }, []);

  const onSubmitHandler =  (e) => {
    let isValid = false;

    if (name === "") {
      setNameError("Polje za ime je prazno.");
      isValid = false;
    }

    if (desc === "") {
      setDescError("Polje za opis je prazno.");
      isValid = false;
    }

    if (category === 0) {
      setCategoryError("Morate izabrati kategoriju.");
      isValid = false;
    }

    if (cuisine === 0) {
      setCuisineError("Morate izabrati kuhinju.");
      isValid = false;
    }

    if (prep === "") {
      setPrepError("Unesite vreme pripreme.");
      isValid = false;
    }

    if (portions === "") {
      setPortionError("Unesite broj porcija.");
      isValid = false;
    }

    isValid = true;

    if (isValid) {
      setLoading(true);
      const formData = new FormData();

      formData.append("recipe_name", name);
      formData.append("portions", portions);
      formData.append("category", category);
      formData.append("cuisine", cuisine);
      formData.append("description", desc);
      formData.append("preparation_time", prep);
      formData.append("fast", fast);
      formData.append("advice", advice);
      formData.append("user_id", user.id);
      formData.append("recipe-image", image);
      formData.append("ingredients", JSON.stringify(ingredients));

      let request = axios
        .post(`http://krckalica-web-app-backend.herokuapp.com/api/recipes/${recipeId}`, formData, {
          headers: {
            // "Content-type": "x-www-form-urlencoded",
            "Content-type": "multipart/form-data",
            // "Authorization": `Bearer ${token}`
          },
          method: "PUT",
        })
        .then((res) => {
          let message = res.data.message;
          setLoading(false);
          setPopup(true);
          setPopupMessage(message);
        });

      console.log(request);
    }
  };

  const onChangeHandler = (action, value) => {
    switch (action) {
      case "name":
        setName(value);
        value === ""
          ? setNameError("Polje za ime je prazno.")
          : setNameError("");
        return;
      case "category":
        setCategory(value);
        value === 0
          ? setCategoryError("Morate izabrati kategoriju.")
          : setCategoryError("");
        return;
      case "cuisine":
        setCuisine(value);
        value === 0
          ? setCuisineError("Morate izabrati kuhinju.")
          : setCuisineError("");
        return;
      case "desc":
        setDesc(value);
        value === ""
          ? setDescError("Polje za opis je prazno.")
          : setDescError("");
        return;
      case "advice":
        setAdvice(value);
        value === ""
          ? setDescError("Polje za savet je prazno.")
          : setDescError("");
        return;
      case "prep":
        setPrep(value);
        value === ""
          ? setPrepError("Unesite vreme pripreme.")
          : setPrepError("");
        return;
      case "portions":
        setPortions(value);
        value === ""
          ? setPortionError("Unesite broj porcija.")
          : setPortionError("");
        return;
      case "fast":
        setFast(value);
        return;
      case "image":
        setImage(value);
        setTempImg(URL.createObjectURL(value));
        return;
      default:
        return;
    }
  };

  const clearInputs = () => {
    setName("");
    setDesc("");
    setAdvice("");
    setPrep("");
    setPortions("");
    setFast(false);
  };

  const closePopup = () => {
    setPopup(false);
    navigate("/user/profile");
  };

  const cancelForm = () => {
    navigate("/user/profile");
  };

  const ingredientChangesHandler = (index, e) => {
    let ingredientsCopy = [...ingredients];
    ingredientsCopy[index][e.target.name] = e.target.value;

    setIngredients(ingredientsCopy);
  };

  const addField = () => {
    setIngredients([...ingredients, { name: "", amount: "" }]);
  };

  const removeFields = (ingredientIndex) => {
    let newIngredients = [...ingredients];
    newIngredients.splice(ingredientIndex, 1);
    setIngredients(newIngredients);
  };

  const displayIngredientsInput = ingredients.map((input, index) => (
    <IngredientsInput
      key={index}
      ingredientIndex={index}
      ingredientsLength={ingredients.length}
      nameValue={input.name}
      amountValue={input.amount}
      inputHandler={ingredientChangesHandler}
      addNewInput={addField}
      removeInput={removeFields}
    />
  ));

  return (
    <>
      {loading && <LoadingPage />}
      {popup && <Popup message={popupMessage} closePopup={closePopup} />}
      <div className="px-3 py-5">
        <div className="container">
          <div className="bg-img bg-overlay rounded text-light banner mb-5">
            <div className="row h-100 py-4">
              <div className="col-12 d-flex align-items-center justify-content-center">
                <h1 className="text-center page-title">Izmeni recept</h1>
              </div>
            </div>
          </div>
        </div>
        <Container>
          <div className="row">
            <form>
              <InputField
                cardClass="form-row"
                label="Naziv recepta"
                inputClass="form-control"
                id="recipe-name"
                type="text"
                placeholder="Unesite naziv recepta"
                value={name}
                name="name"
                handler={onChangeHandler}
                error={nameError}
              />
              <div className="form-inline row">
                <CustomSelect
                  cardClass="form-group col-md-6"
                  label="Kategorija"
                  selectClass="form-control"
                  data={categories}
                  value={category}
                  name="category"
                  handler={onChangeHandler}
                  error={categoryError}
                />
                <CustomSelect
                  cardClass="form-group col-md-6"
                  label="Kuhinja"
                  selectClass="form-control"
                  data={cuisines}
                  value={cuisine}
                  name="cuisine"
                  handler={onChangeHandler}
                  error={cuisineError}
                />
              </div>
              <div className="row">
                <h3>Sastojci</h3>
              </div>
              {displayIngredientsInput}
              <InputField
                cardClass="form-group"
                label="Opis"
                id="description"
                textarea={true}
                inputClass="form-control"
                placeholder="Unesite opis Vaseg recepta"
                value={desc}
                name="desc"
                handler={onChangeHandler}
                error={descError}
              />
              <InputField
                cardClass="form-group"
                label="Priprema"
                id="advice"
                textarea={true}
                inputClass="form-control"
                placeholder="Podelite način pripreme sa drugim korisnicima"
                value={advice}
                name="advice"
                handler={onChangeHandler}
              />
              <div className="form-inline row">
                <InputField
                  cardClass="form-group col-md-4"
                  label="Vreme pripreme"
                  id="preparation"
                  type="text"
                  inputClass="form-control"
                  placeholder="min"
                  value={prep}
                  name="prep"
                  handler={onChangeHandler}
                  error={prepError}
                />
                <InputField
                  cardClass="form-group col-md-4"
                  label="Unesite broj porcija"
                  id="portions"
                  type="text"
                  inputClass="form-control"
                  placeholder="Broj porcija"
                  value={portions}
                  name="portions"
                  handler={onChangeHandler}
                  error={portionError}
                />
                <InputField
                  cardClass="form-group col-md-4"
                  label="Posno"
                  type="checkbox"
                  inputClass="form-check-input form-control"
                  value={recipe.fast}
                  name="fast"
                  handler={onChangeHandler}
                />
              </div>
              <div className="row">
                <InputField
                  cardClass="form-group col-md-4"
                  label="Izaberite sliku recepta"
                  type="file"
                  inputClass="form-control"
                  name="image"
                  handler={onChangeHandler}
                />
                <div className="col-md-12">
                  <img
                    className="img-fluid"
                    src={
                      image
                        ? tempImg
                        : recipe.images
                        ?
                          recipe.images[0].path +
                          recipe.images[0].name
                        : ""
                    }
                  />
                </div>
              </div>

              <div className="d-flex justify-content-evenly mt-5">
                <div type="submit" className="btn form-btn" onClick={onSubmitHandler}>
                  Pošalji
                </div>
                <button className="btn cancel-btn" onClick={cancelForm}>
                  Poništi
                </button>
              </div>
            </form>
          </div>
        </Container>
      </div>
    </>
  );
};

export default EditRecipe;
