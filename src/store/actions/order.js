import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const purchaseSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseFail = (error) => {
    return {
        type: actionTypes.PURCHASE_FAIL,
        error: error
    };
};

export const purchaseStart = () => {
    return {
        type: actionTypes.PURCHASE_START
    };
};

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseStart());
        axios.post('/orders.json', orderData).then(response => {
            dispatch(purchaseSuccess(response.data.name, orderData));
            dispatch(reset());
        }).catch(error => {
            dispatch(purchaseFail(error));
        });
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const reset = () => {
    return {
        type: actionTypes.RESET
    }
}