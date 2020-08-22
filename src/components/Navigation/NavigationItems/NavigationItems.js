import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    let authLink = <NavigationItem link="/auth">Sign Up/Sign In</NavigationItem>;
    if(props.isAuthenticated) {
        authLink = <NavigationItem link="/logout">Logout</NavigationItem>;
    }

    return(
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            <NavigationItem link="/orders">Orders</NavigationItem>
            {authLink}
        </ul>
    );
};

export default navigationItems;