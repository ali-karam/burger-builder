import axios from 'axios';
import apiKey from '../../apiKey';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };     
        let method = 'signUp';
        if(!isSignup) {
            method = 'signInWithPassword';
        }    
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:' + 
            method + '?key=' + apiKey, authData).then(response => {
                console.log(response);
                dispatch(authSuccess(response.data));
            }).catch(err => {
                console.log(err.response);
                dispatch(authFail(err.response));
            }
        );
    };
};