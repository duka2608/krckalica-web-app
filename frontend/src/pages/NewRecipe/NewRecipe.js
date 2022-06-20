import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import CustomSelect from "../../components/CustomSelect";
import InputField from "../../components/InputField";
import axios from "axios";
import LoadingPage from "../../components/LoadingPage";
import { useSelector } from "react-redux";
import Popup from "../../components/Popup";
import { useNavigate } from "react-router-dom";
import IngredientsInput from "./components/IngredientsInput";

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

const NewRecipe = () => {
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
  const [ingredients, setIngredients] = useState([{ name: "", amount: "" }]);

  const [nameError, setNameError] = useState("");
  const [descError, setDescError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [cuisineError, setCuisineError] = useState("");
  const [prepError, setPrepError] = useState("");
  const [portionError, setPortionError] = useState("");

  const [isValid, setIsValid] = useState(false);
  const [popup, setPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const navigate = useNavigate();

  const fetchCategories = () => {
    setLoading(true);
    axios
      .get("http://localhost:8000/api/categories")
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
      .get("http://localhost:8000/api/cuisines")
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
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (name === "") {
      setNameError("Polje za ime je prazno.");
      setIsValid(false);
    } 

    if (desc === "") {
      setDescError("Polje za opis je prazno.");
      setIsValid(false);
    }

    if (category === 0) {
      setCategoryError("Morate izabrati kategoriju.");
      setIsValid(false);
    }

    if (cuisine === 0) {
      setCuisineError("Morate izabrati kuhinju.");
      setIsValid(false);
    }

    if (prep === "") {
      setPrepError("Unesite vreme pripreme.");
      setIsValid(false);
    }

    if (portions === "") {
      setPortionError("Unesite broj porcija.");
      setIsValid(false);
    }

    setIsValid(true);

    if(isValid) {
      const formData = new FormData();

      formData.append('recipe_name', name);
      formData.append('portions', portions);
      formData.append('category', category);
      formData.append('cuisine', cuisine);
      formData.append('description', desc);
      formData.append('preparation_time', prep);
      formData.append('fast', fast);
      formData.append('advice', advice);
      formData.append('user_id', user.id);
      formData.append('recipe-image', image);
      formData.append('ingredients', JSON.stringify(ingredients));
      
      axios
        .post("http://localhost:8000/api/recipes/add", formData, {
          headers: {
            "Content-type": "multipart/form-data",
            // "Authorization": `Bearer ${token}`
          }
        })
        .then((res) => {
          let message = res.data.message;
          setPopup(true);
          setPopupMessage(message);
        });
    }

  };

  const onChangeHandler = (action, value) => {
    switch (action) {
      case "name":
        setName(value);
        value === '' ? setNameError('Polje za ime je prazno.') : setNameError('');
        return;
      case "category":
          setCategory(value);
          value === 0 ? setCategoryError('Morate izabrati kategoriju.') : setCategoryError('');
          return;
      case "cuisine":
          setCuisine(value);
          value === 0 ? setCuisineError('Morate izabrati kuhinju.') : setCuisineError('');
          return;
      case "desc":
        setDesc(value);
        value === '' ? setDescError('Polje za opis je prazno.') : setDescError('');
        return;
      case "advice":
        setAdvice(value);
        return;
      case "prep":
        setPrep(value);
        value === '' ? setPrepError('Unesite vreme pripreme.') : setPrepError('');
        return;
      case "portions":
        setPortions(value);
        value === '' ? setPortionError('Unesite broj porcija.') : setPortionError('');
        return;
      case "fast":
        setFast(value);
        return;
      case "image": 
        setImage(value);
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
    navigate('/user/profile');
  }

  const ingredientChangesHandler = (index, e) => {
    let ingredientsCopy = [...ingredients];
    ingredientsCopy[index][e.target.name] = e.target.value

    setIngredients(ingredientsCopy);
  }

  const addField = () => {
    setIngredients([...ingredients, { name: '', amount: '' }]);
  }

  const removeFields = (ingredientIndex) => {
    let newIngredients = [...ingredients];
    newIngredients.splice(ingredientIndex, 1);
    setIngredients(newIngredients);
  }

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
                        <h1 className="text-center page-title">Novi recept</h1>
                    </div>
                </div>
            </div>
        </div>
        <Container>
          <div className="row">
            <form onSubmit={onSubmitHandler}>
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
                  name="category"
                  handler={onChangeHandler}
                  error={categoryError}
                />
                <CustomSelect
                  cardClass="form-group col-md-6"
                  label="Kuhinja"
                  selectClass="form-control"
                  data={cuisines}
                  name="cuisine"
                  handler={onChangeHandler}
                  error={cuisineError}
                />
              </div>
              <div className="row">
                <h3>Sastojci</h3>
              </div>
              {
                displayIngredientsInput
              }
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
                label="Savet"
                id="advice"
                textarea={true}
                inputClass="form-control"
                placeholder="Podelite savet sa drugim korisnicima"
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
                  value={fast}
                  name="fast"
                  handler={onChangeHandler}
                />
              </div>
              <InputField
                cardClass="form-group"
                label="Izaberite sliku recepta"
                type="file"
                inputClass="form-control"
                name="image"
                handler={onChangeHandler}
              />
              <div className="d-flex justify-content-center mt-5">
                <button type="submit" className="btn form-btn">
                  Pošalji
                </button>
              </div>
            </form>
          </div>
        </Container>
      </div>
    </>
  );
};

export default NewRecipe;
