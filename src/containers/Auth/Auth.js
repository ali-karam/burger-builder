import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';

class Auth extends Component {
    state = {
        controls: {
            email: this.configureInput('email', 'Email Address', '', true, 
                'Please enter a valid email in the form of: abc@domain.com'),
            password: this.configureInput('password', 'Password', '', true, 
                'Please enter at least 6 characters', 6)
        }
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

    render () {
        const formElementsArray = [];
        for(let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        const form = formElementsArray.map(formElement => (
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
        return (
            <div className={classes.Auth}>
                <form>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
            </div>
        );
    }
}

export default Auth;