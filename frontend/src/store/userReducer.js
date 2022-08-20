import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    RESPONSE_MESSAGE
} from "../actions/types";

const token = localStorage.getItem('access_token');
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    token: token ? token : null,
    isAuthenticated: false,
    isLoading: false,
    user: user ? user : null,
    message: ''
};

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case RESPONSE_MESSAGE:
            return {
                message: state.message
            }
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            };
        case LOGIN_SUCCESS:
            localStorage.setItem('access_token', action.payload.access_token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.clear();
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                message: 'Došlo je do greške prilikom autorizacije korisnika.'
            }
        default:
                return state;
    }
}

const store = createStore(
        userReducer,
        composeWithDevTools(applyMiddleware(thunk)),
    );

export default store;