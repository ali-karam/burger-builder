import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentDidMount() {
            axios.interceptors.request.use(req => {
                this.setState({error: null});   //Clear the error when sending a request
                return req;
            })
            axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        errorClearHandler = () => {
            this.setState({error: null});
        }

        render () {
            return (
                <Aux>
                    <Modal show={this.state.error !== null} modalClosed={this.errorClearHandler}>
                        {this.state.error !== null ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            );
        }
    }
}

export default withErrorHandler;