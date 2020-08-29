import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

const checkout = props => {
    const checkoutCancelledHandler = () => {
        props.history.goBack();
    };

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data');
    };

    const emptyBurger = () => {
        const sum = Object.values(props.ingredients).reduce((sum, el) => {
            return sum + el;
        }, 0);
        return sum <= 0;
    };

    const purchaseRedirect = props.purchased || emptyBurger() ? 
        <Redirect to="/"/> : null;
    return (
        <div>
            {purchaseRedirect}
            <CheckoutSummary 
                ingredients={props.ingredients}
                checkoutCancelled={checkoutCancelledHandler}
                checkoutContinued={checkoutContinuedHandler}/>
            <Route 
                path={props.match.url + '/contact-data'} 
                component={ContactData}/>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
};

export default connect(mapStateToProps)(checkout);