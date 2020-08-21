import axios from 'axios';
import apiKey from '../../apiKey';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
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
                dispatch(authSuccess(response.data.idToken, response.data.localId));
            }).catch(err => {
                dispatch(authFail(err.response.data.error));
            }
        );
    };
};