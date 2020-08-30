import React from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

const modal = props => {
    return(
        <Aux>
            <Backdrop show={props.show} clicked={props.modalClosed}/>
            <div className={`${classes.Modal} ${props.show ? classes.Show : classes.Hide}`}>
                {props.children}
            </div>
        </Aux>
    );
};

export default React.memo(
    modal, 
    (prevProps, nextProps) => 
        nextProps.show === prevProps.show && 
        nextProps.children === prevProps.children
);