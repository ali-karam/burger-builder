import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const purchaseConfirm = (state, action) => {
    return {
        ...state,
        purchased: false
    };
};

const purchaseStart = (state, action) => {
    return {
        ...state,
        loading: true
    };
};

const purchaseSuccess = (state, action) => {
    const newOrder = {
        ...action.orderData,
        id: action.orderId
    };
    return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    };
};

const purchaseFail = (state, action) => {
    return {
        ...state,
        loading: false
    };
};

const fetchOrdersStart = (state, action) => {
    return {
        ...state,
        loading: true
    };
};

const fetchOrdersSuccess = (state, action) => {
    return {
        ...state,
        orders: action.orders,
        loading: false
    };
};

const fetchOrdersFail = (state, action) => {
    return {
        ...state,
        loading: false
    };
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_CONFIRM: return purchaseConfirm(state, action);
        case actionTypes.PURCHASE_START: return purchaseStart(state, action);
        case actionTypes.PURCHASE_SUCCESS: return purchaseSuccess(state, action);         
        case actionTypes.PURCHASE_FAIL: return purchaseFail(state, action);
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state, action);
        default: return state;
    }
};

export default reducer;