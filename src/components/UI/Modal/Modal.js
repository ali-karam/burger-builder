import React from 'react';
import classes from './Modal.css';

const modal = (props) => (
    <div className={`${classes.Modal} ${props.show ? classes.Show : classes.Hide}`}>
        {props.children}
    </div>
);

export default modal;