import React, {Component} from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show;
    }
    render() {
        return(
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div className={`${classes.Modal} ${this.props.show ? classes.Show : classes.Hide}`}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;