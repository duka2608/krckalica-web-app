import axios from 'axios';
import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';

export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING });

    const token = getState().token;

    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    if(token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }


    axios.get('http://localhost:8000/api/user', config)
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => console.log(err));
}

export const register = ({ first_name, last_name, username, email, password }) => dispatch => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    const body = JSON.stringify({ first_name, last_name, username, email, password });

    axios.post("http://localhost:8000/api/register", body, config)
    .then(res => dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
    }))
    .catch(err => {
        dispatch({
            type: REGISTER_FAIL
        });
    });
}

export const login = ({ username, password }) => dispatch => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    const body = JSON.stringify({ username, password });

    axios.post("http://localhost:8000/api/login", body, config)
    .then(res => dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
    }))
    .catch(err => {
        dispatch({
            type: LOGIN_FAIL
        });
    });
}

export const logout = () => (dispatch) => {
    const token = localStorage.getItem('access_token');

    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    if(token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }


    axios.post("http://localhost:8000/api/logout", config)
        .then(res => dispatch({
            type: LOGOUT_SUCCESS
        }))
        .catch(err => {
            dispatch({
                type: AUTH_ERROR
            });
        })
}