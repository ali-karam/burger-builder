import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Aux from '../../../hoc/Aux/Aux';

const navigationItems = (props) => {
    let authLinks = <NavigationItem link="/auth">Sign Up/Sign In</NavigationItem>;
    if(props.isAuthenticated) {
        authLinks = (
            <Aux>
                <NavigationItem link="/orders">Orders</NavigationItem>
                <NavigationItem link="/logout">Logout</NavigationItem>   
            </Aux>
        );
    }

    return(
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            {authLinks}
        </ul>
    );
};

export default navigationItems;