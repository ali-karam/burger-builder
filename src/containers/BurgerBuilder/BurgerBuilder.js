import React, {useState} from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import * as actions from '../../store/actions/index';

export const burgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);

    const isPurchasable = (ingredients) => {
        const sum = Object.values(ingredients).reduce((sum, el) => {
            return sum + el;
        }, 0);
        return sum > 0;
    };

    const purchaseHandler = () => { 
        if(props.isAuthenticated) {
            setPurchasing(true);
        } else {
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }  
    };

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
        props.history.push('/checkout');
    };

    const purchaseConfirmHandler = () => {
        props.onConfirmPurchase();
    };

    const mapIngredientsToDisabledInfo = () => {
        const disabledInfo = {
            ...props.ingredients
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = (disabledInfo[key] <= 0)
        }
        return disabledInfo;
    };

    return (
        <Aux>
            <Modal show={props.purchased} modalClosed={purchaseConfirmHandler}>
                <p>Thank you for your order!</p>
            </Modal>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
            <OrderSummary 
                ingredients={props.ingredients}
                price={props.totalPrice}
                purchaseCancelled={purchaseCancelHandler}
                purchaseContinued={purchaseContinueHandler}/>
            </Modal>
            <Burger ingredients = {props.ingredients}/>
            <BuildControls 
                ingredientAdded={props.onIngredientAdded}
                ingredientRemoved={props.onIngredientRemoved}
                disabled={mapIngredientsToDisabledInfo()}
                purchasable={isPurchasable(props.ingredients)}
                ordered={purchaseHandler}
                price={props.totalPrice}
                isAuth={props.isAuthenticated}
            />
        </Aux>
    );
};

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        isAuthenticated: state.auth.token !== null,
        purchased: state.order.purchased
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onConfirmPurchase: () => dispatch(actions.purchaseConfirm()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(burgerBuilder);