import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import * as actions from '../../../store/actions/index';
import {checkValidity} from '../../../shared/validation';

const configureInput = (type, placeholder, value, required, userMessage, minLength, maxLength) => {
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
            maxLength: maxLength,
            isEmail: type === 'email'
        },
        valid: false,
        touched: false,
        errorMessage: errorMessage
    }
};

const checkFormValidity = (updatedOrderForm) => {
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
        formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    return formIsValid;
};

const contactData = props => {
    const [orderForm, setOrderForm] = useState({
        name: configureInput('text', 'Your Name', '', true),
        street: configureInput('text', 'Street', '', true),
        zipCode: configureInput('text', 'Zip Code', '', true,
            'Please enter a 5 digit Zip code' ,5, 5),
        country: configureInput('text', 'Country', '', true),
        email: configureInput('email', 'Your Email', '', true,
            'Please enter a valid email in the form of: abc@domain.com'),
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
    });
    const [formIsValid, setFormIsValid] = useState(false);

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, 
            updatedFormElement.validation);
        updatedOrderForm[inputIdentifier] = updatedFormElement;    
        setOrderForm(updatedOrderForm);
        setFormIsValid(checkFormValidity(updatedOrderForm));
    };

    const blurHandler = (inputIdentifier) => {
        const updatedOrderForm = {
            ...orderForm,
            [inputIdentifier]: {
                ...orderForm[inputIdentifier],
                touched: true
            }
        };
        setOrderForm(updatedOrderForm);
    };

    const renderForm = () => {
        const formElementsArray = [];
        for(let key in orderForm) {
            formElementsArray.push({
                id: key,
                config: orderForm[key]
            });
        }
        let form = (
            <form onSubmit={orderHandler}>
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
                        changed={(event) => inputChangedHandler(event, formElement.id)}
                        blurred={() => blurHandler(formElement.id)}/>
                ))}
                <Button btnType="Success" disabled={!formIsValid}>Order</Button>
            </form>
        );
        if(props.loading) {
            form = <Spinner/>;
        }
        return form;
    };

    const orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for(let formElementId in orderForm) {
            formData[formElementId] = orderForm[formElementId].value;
        }
        const order = {
            ingredients: props.ingredients,
            price: props.price,
            orderData: formData,
            userId: props.userId
        }
        props.onOrder(order, props.token);
    };

    return(
        <div className={classes.ContactData}>
            <h4>Enter Your Contact Data</h4>
            {renderForm()}
        </div>
    );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(contactData);