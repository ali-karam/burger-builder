import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: {
        lettuce: 0,
        bacon: 0,
        cheese: 0,
        beef: 0
    },
    totalPrice: 5
};

const INGREDIENT_PRICES = {
    lettuce: 0.5,
    cheese: 0.4,
    beef: 1.3,
    bacon: 0.7
};

const addIngredient = (state, action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    };
};

const removeIngredient = (state, action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    };
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.RESET: return initialState;        
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        default: return state;
    }
};

export default reducer;