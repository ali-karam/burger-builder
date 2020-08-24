import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Aux from '../../../hoc/Aux/Aux';

const renderLinks = (props) => {
    let links = <NavigationItem link="/auth">Sign Up/Sign In</NavigationItem>;
    if(props.isAuthenticated) {
        links = (
            <Aux>
                <NavigationItem link="/orders">Orders</NavigationItem>
                <NavigationItem link="/logout">Logout</NavigationItem>   
            </Aux>
        );
    }
    return links;
};

const navigationItems = (props) => {
    return(
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            {renderLinks(props)}
        </ul>
    );
};

export default navigationItems;