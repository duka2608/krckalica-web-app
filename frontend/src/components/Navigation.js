import styled from "styled-components";
import logo from "../assets/images/Krckalica-logo.png";
import { useState, useEffect } from "react";
import DropdownList from "./DropdownList";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadUser, login, logout } from "../actions/userActions";
import LoadingPage from "./LoadingPage";

const TopNav = styled.nav`
  background-color: var(--main-green);
  padding: 10px 0px;
  box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.15);

  .dropdown-menu {
    left: initial;
    right: 0;
  }
`;

const ImageBox = styled.div`
  margin-right: 20px;

  @media only screen and (max-width: 1199px) {
    width: 150px;
    margin-right: 0;
    
    img {
      width: 100%;
    }
  }
`;

const SearchResults = styled.div`
  position: absolute;
  background-color: white;
  height: fit-content;
  max-height: 26vh;
  overflow-y: scroll;
  width: 500px;
  border: 1px solid rgba(0,0,0,.15);
  border-radius: 0.25rem;
  margin-top: 0.5rem;
  z-index: 1;

  div {
    padding: 0.5rem 0.5rem;
    display: flex;
    align-items: center;

    .img-container {
      margin-right: 1rem;

      img {
        width: 50px;
        height: 50px;
        object-fit: contain;
        object-position: center;
      }
    }

    p {
      margin: 0;
      transition: color 0.15s ease-in-out;
    }

    &:hover {
      p {
        color: var(--main-green);
      }
    }
  }

  @media only screen and (max-width: 1199px) {
    width: 30%;

    left: 45%;
  }
  @media only screen and (max-width: 768px) {
    width: 100%;
    left: 0%;
    position: relative;
  }

`;

const Navigation = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [search, setSearch] = useState(false);
  const [searchBox, setSearchBox] = useState('');
  const [recipes, setRecipes] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const reduxState = useSelector((state) => state);

  const fetchCategories = () => {
    axios
      .get("http://localhost:8000/api/categories")
      .then(function (response) {
        setCategories(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const fetchCuisines = () => {
    axios
      .get("http://localhost:8000/api/cuisines")
      .then(function (response) {
        setCuisines(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCategories();
    fetchCuisines();

    if (!reduxState.user) {
      localStorage.removeItem("access_token");
    }
  }, []);

  const loginHandler = (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append("username", username);
    data.append("password", password);

    let loginUser = {
      username,
      password,
    };

    dispatch(login(loginUser));

    if (reduxState.user) {
      navigate("/");
    }

    setUsername('');
    setPassword('');
  };

  const logoutHandler = (e) => {
    e.preventDefault();

    dispatch(logout());
    navigate("/");
  };

  const closeSearch = () => {
    setSearch(false);
    setSearchBox('');
    setRecipes([]);
  }

  const searchBoxHandler = (e) => {
    setSearchBox(e.target.value);
    if(searchBox.length > 2) {
      axios
      .post("http://localhost:8000/api/recipes/search", {
        search: searchBox
      })
      .then(function (response) {
        setRecipes(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
      setSearch(true);
    } else {
      setSearch(false);
      setRecipes([]);
    }
  }


  const showData =
    recipes && recipes.length > 0 ? (
      recipes.map((el, index) => (
        <Link to={{
          pathname: `/recipes/${el.id}`
        }} key={index} onClick={closeSearch}>
          <div>
            <div className="img-container">
              <img src={"http://localhost:8000/" +
                    el.images[0].path +
                    el.images[0].name} alt={el.name} />
            </div>
            <p>{el.name}</p>
          </div>
        </Link>
      ))
    ) : (
      <h3 className="p-2">Nema rezultata za datu pretragu</h3>
    );

  return (
    <>
      {reduxState.isLoading && <LoadingPage />}
      <header>
      <TopNav className="navbar navbar-light navbar-expand-md">
        <div className="container">
          <ImageBox>
            <Link to="/">
              <img src={logo} alt="Krckalica logo" />
            </Link>
          </ImageBox>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse row px-4" id="navbar">
            <ul className="navbar-nav ms-auto d-flex align-items-md-center justify-content-evenly">
            <li className="nav-item d-block d-md-none py-3">
                <input
                  type="text"
                  className="navbar-form nav-search rounded"
                  placeholder="Pretrazi"
                  value={searchBox}
                  onChange={(e) => searchBoxHandler(e)}
                  onBlur={() => setTimeout(() => { setSearch(false) }, 500) }
                  onFocus={() => searchBox.length > 2 && setSearch(true)}
                />
                {search &&                 
                <SearchResults className="scroll">
                  {showData}
                </SearchResults>}
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  role="button"
                >
                  Kategorije
                </a>
                {categories && (
                  <DropdownList data={categories} title="category" />
                )}
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Kuhinje
                </a>
                {cuisines && <DropdownList data={cuisines} title="cuisine" />}
              </li>
              <li className="d-none d-md-block">
                <input
                  type="text"
                  className="navbar-form nav-search rounded"
                  placeholder="Pretrazi"
                  value={searchBox}
                  onChange={(e) => searchBoxHandler(e)}
                  onBlur={() => setTimeout(() => { setSearch(false) }, 500) }
                  onFocus={() => searchBox.length > 2 && setSearch(true)}
                />
                {search &&                 
                <SearchResults className="scroll">
                  {showData}
                </SearchResults>}
              </li>
              {!reduxState.user ? (
                <>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdownMenuLink"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Login
                    </a>
                    <div className="dropdown-menu" id="formLogin">
                      <div className="row">
                        <div className="container-fluid">
                          <form onSubmit={loginHandler}>
                            <div className="form-group my-2">
                              <label className="">Username</label>
                              <input
                                className="form-control"
                                name="username"
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                              />
                            </div>
                            <div className="form-group">
                              <label className="">Password</label>
                              <input
                                className="form-control"
                                name="password"
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <br className="" />
                            </div>
                            <button
                              type="submit"
                              id="btnLogin"
                              className="btn btn-success btn-sm"
                            >
                              Login
                            </button>
                            <Link
                              to="/registration"
                              className="btn btn-sm mx-3 btn-success text-white"
                            >
                              Registracija
                            </Link>
                          </form>
                        </div>
                      </div>
                    </div>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/user/profile" className="nav-link">
                      Moj profil
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link" onClick={logoutHandler}>
                      Logout
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </TopNav>
    </header>
    </>
  );
};

export default Navigation;
