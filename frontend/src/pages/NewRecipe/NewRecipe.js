import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import CustomSelect from "../../components/CustomSelect";
import InputField from "../../components/InputField";
import axios from "axios";
import LoadingPage from "../../components/LoadingPage";

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

  const [nameError, setNameError] = useState("");
  const [descError, setDescError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [cuisineError, setCuisineError] = useState("");
  const [prepError, setPrepError] = useState("");
  const [portionError, setPortionError] = useState("");

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
    } 

    if (desc === "") {
        setDescError("Polje za opis je prazno.");
    }

    if (category === 0) {
      setCategoryError("Morate izabrati kategoriju.");
    }

    if (cuisine === 0) {
      setCuisineError("Morate izabrati kuhinju.");
    }

    if (prep === "") {
      setPrepError("Unesite vreme pripreme.");
    }

    if (portions === "") {
      setPortionError("Unesite broj porcija.");
    }

    console.log({
      name,
      desc,
      advice,
      prep,
      portions,
      fast,
    });

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

  return (
    <>
      {loading && <LoadingPage />}
      <div className="px-3 py-5">
        <Container>
          <div className="row text-center">
            <h2>Novi recept</h2>
          </div>
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
