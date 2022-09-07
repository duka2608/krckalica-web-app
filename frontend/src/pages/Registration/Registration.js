import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { register } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage";
import Popup from "../../components/Popup";
import InputField from "../../components/InputField";
import CustomSelect from "../../components/CustomSelect";

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

const Registration = () => {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");

  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState(0);
  const [locationError, setLocationError] = useState(false);

  const [email, setEmail] = useState("");
  const validEmail = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  
  const [image, setImage] = useState("");

  const [popup, setPopup] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    fetchLocations();
  }, [user]);

  const fetchLocations = () => {
    axios.get("http://krckalica-web-app-backend.herokuapp.com/api/locations").then((res) => setLocations(res.data));
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();

    let isValid = true;

    if (firstName.trim() === "") {
      setFirstNameError("Polje za ime ne sme biti prazno.");
      isValid = false;
    }

    if (lastName.trim() === "") {
      setLastNameError("Polje za prezime ne sme biti prazno.");
      isValid = false;
    }

    if (username.trim() === "") {
      setUsernameError("Polje za prezime ne sme biti prazno.");
      isValid = false;
    } else if(username.length < 6 || username.length > 15) {
      setUsernameError("Korisničko ime mora imati između 8 i 15 karaktera.");
      isValid = false;
    }

    if (location == 0) {
      setLocationError(true);
      isValid = false;
    }

    if(email.trim() === "") {
      setEmailError("Morate uneti e-mail adresu.");
      isValid = false;
    } else if (!validEmail.test(email)) {
      setEmailError("Vaša e-mail adresa nije validnog formata.");
      isValid = false;
    }

    if(password.trim() === "") {
      setPasswordError("Morate uneti šifru kako biste napravili nalog.");
      isValid = false;
    } else if (password.length < 8 || password.length > 20) {
      setPasswordError("Šifra mora imati između 8 i 20 karaktera");
      isValid = false;
    }

    const newUser = {
      first_name: firstName,
      last_name: lastName,
      username,
      email,
      image,
      location,
      password,
    };

    if (isValid) {
      dispatch(register(newUser));
      navigate("/");
    }
  };

  const onLocationChangeHandler = (action, value) => {
    if(value === 0) {
      setLocationError(true);
    } else {
      setLocationError(false);
    }
    
    setLocation(value);
  }

  return (
    <>
      {loading && <LoadingPage />}
      <div className="px-3 py-5">
        <Container>
          <div className="row text-center">
            <h2>Registracija</h2>
          </div>
          <div className="row">
            <form onSubmit={formSubmitHandler} encType="multipart/form-data">
              <div className="form-row d-flex justify-content-between">
                <div className="col-md-5">
                  <label className="text-muted" htmlFor="first-name">
                    Ime*
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="first-name"
                    aria-describedby="emailHelp"
                    placeholder="Unesite ime"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  {firstNameError && (
                    <p className="text-danger mb-0">{firstNameError}</p>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="text-muted" htmlFor="last-name">
                    Prezime*
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="last-name"
                    placeholder="Unesite prezime"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  {lastNameError && (
                    <p className="text-danger mb-0">{lastNameError}</p>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label className="text-muted" htmlFor="register_username">
                  Korisničko ime*
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="register_username"
                  aria-describedby="emailHelp"
                  placeholder="Unesite korisničko ime"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {usernameError && (
                    <p className="text-danger mb-0">{usernameError}</p>
                )}
              </div>
              <div className="form-group">
                <label className="text-muted" htmlFor="birthday">
                  Datum rođenja
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="birthday"
                  aria-describedby="emailHelp"
                />
              </div>
              <CustomSelect
                  cardClass="form-group col-md-6"
                  label="Lokacija"
                  selectClass="form-control"
                  data={locations}
                  value={location}
                  name="location"
                  handler={onLocationChangeHandler}
                  error={locationError && "Morate odabrati lokaciju."}
                />
              <div className="form-group">
                <label className="text-muted" htmlFor="email">
                  Email adresa*
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Unesite email adresu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && (
                    <p className="text-danger mb-0">{emailError}</p>
                )}
              </div>
              <div className="form-group">
                <label className="text-muted" htmlFor="register_password">
                  Šifra*
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="register_password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && (
                    <p className="text-danger mb-0">{passwordError}</p>
                )}
              </div>
              <div className="form-group">
              <label className="text-muted" htmlFor="register_avatar">
                  Slika
                </label>
                <input
                  className="form-control"
                  label="Izaberite profilnu sliku"
                  type="file"
                  inputClass="form-control"
                  name="image"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
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

export default Registration;
