import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';

class Auth extends Component {
    state = {
        controls: {
            email: this.configureInput('email', 'Email Address', '', true, 
                'Please enter a valid email in the form of: abc@domain.com'),
            password: this.configureInput('password', 'Password', '', true, 
                'Please enter at least 6 characters', 6)
        },
        isSignup: true
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
                maxLength: maxLength,
                isEmail: type === 'email'
            },
            valid: false,
            touched: false,
            errorMessage: errorMessage
        }
    }

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
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, 
                    this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls});
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, 
            this.state.controls.password.value, this.state.isSignup);
    };

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup}
        });
    };

    redirectOnAuth = () => {
        let authRedirect = null;
        if(this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>;
        }
        return authRedirect;
    };

    renderForm = () => {
        const formElementsArray = [];
        for(let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementsArray.map(formElement => (
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
            />
        ));

        if(this.props.loading) {
            form = <Spinner/>;
        }

        return form;
    };

    formatErrorMessage = (errorMessage) => {
        switch(errorMessage) {
            case 'EMAIL_EXISTS':
                return 'Sorry the email already exists, please try a different email.';
            case 'INVALID_EMAIL':
                return 'Sorry please enter a valid email.';
            case 'MISSING_PASSWORD':
                return 'Please enter your password.';
            case 'MISSING_EMAIL':
                return 'Please enter your email.';
            case 'INVALID_PASSWORD':
                return 'Sorry the password is incorrect, please try again.';
            case 'WEAK_PASSWORD : Password should be at least 6 characters':
                return 'Please enter at least 6 characters for the password.';
            default: return 'Something went wrong';
        }
    };

    displayErrorMsg = () => {
        let errorMessage = null;
        if(this.props.error !== null) {
            errorMessage = (
                <p className={classes.Error}>
                    {this.formatErrorMessage(this.props.error.message)}
                </p>
            );
        }
        return errorMessage;
    };

    render () {
        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {this.renderForm()}
                    <Button btnType="Success">Submit</Button>
                </form>
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
                    Switch to {this.state.isSignup ? ' Sign In' : ' Sign Up'}
                </Button>
                {this.redirectOnAuth()}
                {this.displayErrorMsg()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);