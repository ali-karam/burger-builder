import React from 'react';
import classes from './Order.css';

const displayIngredients = (props) => {
    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span 
            className={classes.Ingredient}
            key={ig.name}>{ig.name} ({ig.amount})</span>;
    });
    return ingredientOutput;
};

const order = (props) => {
    return (
        <div className={classes.Order}>
            <p>Ingredients: {displayIngredients(props)}</p>
            <p>Price: <strong>${props.price.toFixed(2)}</strong></p>
        </div>
    );
}

export default order;