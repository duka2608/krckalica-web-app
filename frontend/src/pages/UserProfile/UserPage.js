import { useState, useEffect } from "react";
import styled from "styled-components";
import RecipeCard from "../../components/RecipeCard";

import { useSelector } from "react-redux";
import axios from "axios";
import UserRecipes from "./UserRecipes";

const Box = styled.span`
  width: 30px;
  height: 30px;
  background-color: var(--main-green);
  margin-right: 10px;
`;

const UserPage = () => {
  const user = useSelector((state) => state.user);

  return (
    user && (
      <div className="px-3 py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>{user.first_name + " " + user.last_name}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h2>Slika korisnika</h2>
            </div>
            <div className="col">
              <ul>
                <li className="profile-list-item">Lokacija: {user.location.name}</li>
                <li className="profile-list-item">Datum rodjenja: 26.08.1997.</li>
                <li className="profile-list-item">Biografija: {user.biography}</li>
              </ul>
            </div>
            <div className="col">
              <ul>
                <li className="profile-list-item">
                  {user.commentsCount} Komentara
                </li>
                <li className="profile-list-item">
                  0 Prijatelja
                </li>
                <li className="profile-list-item">
                  {user.recipesCount} Recepata
                </li>
              </ul>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col">
              <h1>Moji recepti</h1>
            </div>
            <div className="col d-flex justify-content-center">
              <a href="#" className="btn green-btn">
                Novi recept
              </a>
            </div>
          </div>
          <div className="row mt-3">
                {<UserRecipes id={user.id} />}  
            </div>
          <div className="row">
            <h1>Omiljeni recepti</h1>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6 col-lg-3">
              <RecipeCard />
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <RecipeCard />
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <RecipeCard />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default UserPage;
