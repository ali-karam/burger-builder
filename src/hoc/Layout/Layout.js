import React, {useState} from 'react';
import {connect} from 'react-redux';

import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const layout = props => {
    const [sideDrawerIsVisible, setSideDrawerVisibility] = useState(false);

    const sideDrawerClosedHandler = () => {
        setSideDrawerVisibility(false);
    };

    const sideDrawerToggleHandler = () => {
        setSideDrawerVisibility(!sideDrawerIsVisible);
    };

    return (
        <Aux>
            <Toolbar drawerToggleClicked={sideDrawerToggleHandler}
                isAuth={props.isAuthenticated}/>
            <SideDrawer 
                open={sideDrawerIsVisible} 
                closed={sideDrawerClosedHandler}
                isAuth={props.isAuthenticated}
            />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(layout);