import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import {checkValidity} from '../../shared/validation';

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

const formatErrorMessage = (errorMessage) => {
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

const auth = props => {
    const [authForm, setAuthForm] = useState({
        email: configureInput('email', 'Email Address', '', true, 
            'Please enter a valid email in the form of: abc@domain.com'),
        password: configureInput('password', 'Password', '', true, 
            'Please enter at least 6 characters', 6)
    });
    const [isSignup, setIsSignup] = useState(true);

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...authForm,
            [controlName]: {
                ...authForm[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, 
                    authForm[controlName].validation)
            }
        };
        setAuthForm(updatedControls);
    };

    const blurHandler = (controlName) => {
        const updatedControls = {
            ...authForm,
            [controlName]: {
                ...authForm[controlName],
                touched: true
            }
        };
        setAuthForm(updatedControls)
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(authForm.email.value, 
            authForm.password.value, isSignup);
    };

    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup)
    };

    const redirectOnAuth = () => {
        let authRedirect = null;
        if(props.isAuthenticated) {
            authRedirect = <Redirect to={props.authRedirectPath}/>;
        }
        return authRedirect;
    };

    const renderForm = () => {
        const formElementsArray = [];
        for(let key in authForm) {
            formElementsArray.push({
                id: key,
                config: authForm[key]
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
                changed={(event) => inputChangedHandler(event, formElement.id)}
                blurred={() => blurHandler(formElement.id)}
            />
        ));

        if(props.loading) {
            form = <Spinner/>;
        }

        return form;
    };

    const displayErrorMsg = () => {
        let errorMessage = null;
        if(props.error !== null) {
            errorMessage = (
                <p className={classes.Error}>
                    {formatErrorMessage(props.error.message)}
                </p>
            );
        }
        return errorMessage;
    };

    return (
        <div className={classes.Auth}>
            <form onSubmit={submitHandler}>
                {renderForm()}
                <Button btnType="Success">Submit</Button>
            </form>
            <Button btnType="Danger" clicked={switchAuthModeHandler}>
                Switch to {isSignup ? ' Sign In' : ' Sign Up'}
            </Button>
            {redirectOnAuth()}
            {displayErrorMsg()}
        </div>
    );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(auth);