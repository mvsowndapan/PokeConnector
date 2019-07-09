import React, { Component } from 'react';
//connecting the component into the redux
import { connect } from 'react-redux';
//to use the registerUser function from actions/authActions import it
import { registerUser } from '../../actions/authActions';
//All the actions data are to included into the props so that we can use in another function this data as well,
// and we need to ass all the property of the component into the proptypes
import PropTypes from 'prop-types';
//to redirect from one page to another we need 
import { withRouter } from 'react-router-dom';
//textfield
import Textfield from '../common/Textfield';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            confrim: '',
            err: {}
        };
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    componentDidMount() {
        if (this.props.auth.isAuthenticated) this.props.history.push('/dashboard');
    }
    //add errors to props when somwthing occur
    componentWillReceiveProps(nextProps) {
        if (nextProps.err) this.setState({ err: nextProps.err });
    }
    onSubmit = (e) => {
        e.preventDefault();
        let { name, email, password, confrim } = this.state;
        this.props.registerUser({ name, email, password, confrim }, this.props.history);
    }
    render() {
        const { err } = this.state;
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-6 text-center text-dark">Register</h1>
                            <p className="lead text-center">
                                Create your PokeConnector account</p>
                            <form noValidate onSubmit={this.onSubmit}>
                                <Textfield
                                    type='name'
                                    name='name'
                                    placeholder='name'
                                    value={this.state.name}
                                    onChange={this.onChange}
                                    err={err.name}
                                />
                                <Textfield
                                    type='email'
                                    name='email'
                                    placeholder='Email Address'
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    err={err.email}
                                    info="This site uses Gravater Email."
                                />
                                <Textfield
                                    type='password'
                                    name='password'
                                    placeholder='Password'
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    err={err.password}
                                />
                                <Textfield
                                    type='password'
                                    name='confrim'
                                    placeholder='confrim'
                                    value={this.state.confrim}
                                    onChange={this.onChange}
                                    err={err.confrim}
                                />
                                <input type="submit" className="btn btn-dark btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// adding all properties to prop
Register.protoTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    err: PropTypes.object.isRequired
}
// mapping data into the props
const mapStateToProps = (state) => ({
    auth: state.auth,
    err: state.err
})
export default connect(mapStateToProps, { registerUser })(withRouter(Register));