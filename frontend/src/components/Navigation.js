import styled from "styled-components";
import logo from "../assets/images/Krckalica-logo.png";
import { useState, useEffect } from "react";
import DropdownList from "./DropdownList";
import axios from "axios";
import { Link } from 'react-router-dom';

const TopNav = styled.nav`
  background-color: var(--main-green);
  padding: 10px 0px;
  box-shadow: 5px 5px 10px 5px rgba(0,0,0,0.15);
`;

const ImageBox = styled.div`
  margin-right: 20px;

  @media only screen and (max-width: 991px) {
    margin-right: 0px;

    img {
      width: 90%;
    }
  }

  @media only screen and (max-width: 768px) {
    img {
      width: 80%;
    }
  }
`;

const Navigation = () => {
  const [categories, setCategories] = useState([]);
  const [cuisines, setCuisines] = useState([]);

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
  }, []);

  return (
    <header>
      <TopNav className="navbar navbar-expand-md">
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
            data-bs-target="#navmenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="row collapse navbar-collapse" id="navmenu">
            <ul className="navbar-nav ms-auto d-flex align-items-center justify-content-evenly">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Kategorije
                </a>
                {categories && <DropdownList data={categories} />}
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Kuhinje
                </a>
                {cuisines && <DropdownList data={cuisines} />}
              </li>
              <li>
                <input type="text" className="navbar-form nav-search" placeholder="Pretrazi" />
              </li>
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
                                <form className="">
                                    <div className="form-group my-2">
                                        <label className="">Username</label>
                                        <input className="form-control" name="username" id="username" type="text"/>
                                    </div>
                                    <div className="form-group">
                                        <label className="">Password</label>
                                        <input className="form-control" name="password" id="password" type="password"/>
                                        <br className=""/>
                                    </div>
                                    <button type="submit" id="btnLogin" className="btn btn-success btn-sm">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
              </li>
              <li>
                <a href="#" className="nav-link">Registracija</a>
              </li>
            </ul>
          </div>
        </div>
      </TopNav>
    </header>
  );
};

export default Navigation;
