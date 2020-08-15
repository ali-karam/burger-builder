import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 0 
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const extractedIngredients = {};
        const price = query.get("price");
        query.delete("price");
        for (let param of query.entries()) {
            extractedIngredients[param[0]] = +param[1];
        }
        this.setState({ingredients: extractedIngredients, totalPrice: price});
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                <Route 
                    path={this.props.match.url + '/contact-data'} 
                    render={(props) => (
                        <ContactData ingredients={this.state.ingredients} 
                        price={this.state.totalPrice}
                        {...props}/>)}/>
            </div>
        );
    }
}

export default Checkout;