import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-order';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Jimmy Kimmel',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '41354',
                    country: 'Canada'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'express'
        }
        axios.post('/orders.json', order).then(response => {
            this.setState({loading: false});
            this.props.history.push('/');
        }).catch(error => {
            this.setState({loading: false});
        });
    }

    render () {
        let form = (
            <form>
                <Input inputType="input" type="text" name="name" placeholder="Your Name"/>
                <Input inputtype="input" type="email" name="email" placeholder="Your Email"/>
                <Input inputtype="input" type="text" name="sreeet" placeholder="Street"/>
                <Input inputtype="input" type="text" name="postal" placeholder="Postal Code"/>
                <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
            </form>
        );
        if(this.state.loading) {
            form = <Spinner/>;
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;