import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];

const renderControls = (props) => {
    return controls.map(ctrl => (
        <BuildControl 
            key={ctrl.label} 
            label={ctrl.label} 
            added={() => props.ingredientAdded(ctrl.type)}
            removed={() => props.ingredientRemoved(ctrl.type)}
            disabled={props.disabled[ctrl.type]}
        />
    ));
};

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
        {renderControls(props)}
        <button 
            className={classes.OrderButton} 
            disabled={!props.purchasable}
            onClick={props.ordered}>
            {props.isAuth ? 'Order Now' : 'Sign Up/Sign In to Order'}
        </button>
    </div>
);

export default buildControls;