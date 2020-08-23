import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    emptyBurger = () => {
        const sum = Object.values(this.props.ingredients).reduce((sum, el) => {
            return sum + el;
        }, 0);
        return sum <= 0;
    };

    render() {
        const purchaseRedirect = this.props.purchased || this.emptyBurger() ? 
            <Redirect to="/"/> : null;
        return (
            <div>
                {purchaseRedirect}
                <CheckoutSummary 
                    ingredients={this.props.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                <Route 
                    path={this.props.match.url + '/contact-data'} 
                    component={ContactData}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
};

export default connect(mapStateToProps)(Checkout);