import React from 'react';
import classes from './Input.css';

const configureInput = (props, inputClasses) => {
    let inputElement = null;
    switch(props.elementType) {
        case('input'):
            inputElement = <input 
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                autoComplete="off"
                onBlur={props.blurred}/>;
            break;
        case('textarea'):
            inputElement = <textarea 
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                onChange={props.changed}/>;
            break;
        case('select'):
        inputElement = (
            <select
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed}>
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.displayValue}
                    </option>
                ))}
            </select>);
        break;
        default:
            inputElement = <input 
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value = {props.value}
                onChange={props.changed}/>;
    }
    return inputElement;
};

const input = (props) => {
    let validationError = null;
    const inputClasses = [classes.InputElement];
    
    if(props.shouldValidate && props.touched && props.invalid) {
        inputClasses.push(classes.Invalid);
        validationError = <p className={classes.ValidationError}>
            {props.errorMessage}</p>;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {configureInput(props, inputClasses)}
            {validationError}
        </div>
    );
};

export default input;