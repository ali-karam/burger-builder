import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        orderForm: {
            name: this.configureInput('text', 'Your Name', '', true),
            street: this.configureInput('text', 'Street', '', true),
            zipCode: this.configureInput('text', 'Zip Code', '', true,
                'Please enter a 5 digit Zip code' ,5, 5),
            country: this.configureInput('text', 'Country', '', true),
            email: this.configureInput('email', 'Your Email', '', true),
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'express', displayValue: 'Express'},
                        {value: 'priority', displayValue: 'Priority'},
                    ]
                },
                value: 'express',
                validation: {},
                valid: true
            }
        },
        formIsValid: false
    };

    configureInput(type, placeholder, value, required, userMessage, minLength, maxLength) {
        let errorMessage = "Please enter a value";  
        if(userMessage != null) {
            errorMessage = userMessage;
        }
        return {
            elementType: 'input',
            elementConfig: {
                type: type,
                placeholder: placeholder
            },
            value: value,
            validation: {
                required: required,
                minLength: minLength,
                maxLength: maxLength
            },
            valid: false,
            touched: false,
            errorMessage: errorMessage
        }
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, 
            updatedFormElement.validation);
        updatedOrderForm[inputIdentifier] = updatedFormElement;    
        this.setState({orderForm: updatedOrderForm, formIsValid: 
            this.checkFormValidity(updatedOrderForm)});
    };

    blurHandler = (inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm,
            [inputIdentifier]: {
                ...this.state.orderForm[inputIdentifier],
                touched: true
            }
        };
        this.setState({orderForm: updatedOrderForm});
    };

    checkValidity (value, rules) {
        let isValid = true;
        
        if(rules == null) {
            return;
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid; 
        }
        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    checkFormValidity (updatedOrderForm) {
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        return formIsValid;
    }

    renderForm = () => {
        const formElementsArray = [];
        for(let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        shouldValidate={formElement.config.validation} 
                        invalid={!formElement.config.valid}
                        errorMessage={formElement.config.errorMessage}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        blurred={() => this.blurHandler(formElement.id)}/>
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
            </form>
        );
        if(this.props.loading) {
            form = <Spinner/>;
        }
        return form;
    };

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for(let formElementId in this.state.orderForm) {
            formData[formElementId] = this.state.orderForm[formElementId].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }
        this.props.onOrder(order, this.props.token);
    };

    render () {
        return(
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {this.renderForm()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrder: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);