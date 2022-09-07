import axios from 'axios';
import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    CLEAR_MESSAGE
} from './types';

export const clearMessage = () => (dispatch) => {
    dispatch({ type: CLEAR_MESSAGE });
}

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


    axios.get('http://krckalica-web-app-backend.herokuapp.com/api/user', config)
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => 
            dispatch({
                type: AUTH_ERROR
            })    
        );
}

export const register = ({ first_name, last_name, username, email, location, password, image }) => dispatch => {
    
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    const body = new FormData();
    body.append('first_name', first_name);
    body.append('last_name', last_name);
    body.append('username', username);
    body.append('email', email);
    body.append('avatar', image);
    body.append('location_id', location);
    body.append('password', password);

    axios.post("http://krckalica-web-app-backend.herokuapp.com/api/register", body, config)
    .then(res => {
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
        });
    })
    .catch(err => {
        dispatch({
            type: REGISTER_FAIL
        });
    });
}

export const login = ({ username, password }) => dispatch => {
    dispatch({ type: USER_LOADING });
    
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    const body = JSON.stringify({ username, password });

    axios.post("http://krckalica-web-app-backend.herokuapp.com/api/login", body, config)
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
    dispatch({ type: USER_LOADING });
    const token = localStorage.getItem('access_token');

    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    if(token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }


    axios.post("http://krckalica-web-app-backend.herokuapp.com/api/logout", config)
        .then(res => dispatch({
            type: LOGOUT_SUCCESS
        }))
        .catch(err => {
            dispatch({
                type: AUTH_ERROR
            });
        })
}