import { useState, useEffect } from "react";
import styled from "styled-components";
import RecipeCard from "../../components/RecipeCard";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import UserRecipes from "./UserRecipes";
import FavoriteRecipes from "./FavoriteRecipes";
import { Link } from "react-router-dom";
import { loadUser } from "../../actions/userActions";
import Button from "../../components/Button";
import avatar from "../../assets/images/avatar.svg";

const Box = styled.span`
  width: 30px;
  height: 30px;
  background-color: var(--main-green);
  margin-right: 10px;
`;

const UserAvatar = styled.div`
  img {
    border: 3px solid var(--main-green);
    border-radius: 50%;
    width: 200px;
    height: 200px;
    object-fit: contain;
  }

  h1 {
    margin-top: 15px;
  }
`;

const UserPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  console.log(user);

  return (
    user && (
      <div className="px-3 py-5">
        <div className="container">
          <div className="row">
            <div className="col-12 d-none d-md-flex">
              <h1>{user.first_name + " " + user.last_name}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-4 mb-3 mb-md-0">
              <UserAvatar>
                <img
                  src={"http://localhost:8000/" + user.avatar}
                  alt="avatar"
                />
                <h1 className="d-block d-md-none">{user.first_name + " " + user.last_name}</h1>
              </UserAvatar>
            </div>
            <div className="col-12 col-md-4">
              <ul className="px-0">
                <li className="profile-list-item">
                  Lokacija: {user.location.name}
                </li>
                <li className="profile-list-item">
                  Datum rodjenja: 26.08.1997.
                </li>
                <li className="profile-list-item">
                  Biografija: {user.biography}
                </li>
              </ul>
            </div>
            <div className="col-12 col-md-4">
              <ul className="px-0">
                <li className="profile-list-item">
                  Ukupno recepata: {user.recipesCount}
                </li>
                <li className="profile-list-item">
                  Omiljeni recepti: {user.favoriteCount}
                </li>
                <li className="profile-list-item">
                  Komentari: {user.commentsCount}
                </li>
              </ul>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col">
              <h1>Moji recepti</h1>
            </div>
            <div className="col d-flex justify-content-end">
              <Button path="/user/new-recipe">Novi recept</Button>
            </div>
          </div>
          <div className="row mt-3">{<UserRecipes id={user.id} />}</div>
          <div className="row">
            <h1>Omiljeni recepti</h1>
          </div>
          <div className="row mt-3">{<FavoriteRecipes id={user.id} />}</div>
        </div>
      </div>
    )
  );
};

export default UserPage;
