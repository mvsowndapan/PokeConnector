import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//action
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';
//images
import pokeball from '../../img/pokeball.png';

class Navbar extends Component {
    onLogoutClick = (e) => {
        e.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logoutUser();
        // window.location.href = '/'; // redirect him to the login page
    };
    render() {
        const { isAuthenticated, user } = this.props.auth;
        let userLink = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item ">
                    <Link className="nav-link " to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item ">
                    <Link className="nav-link " to="/team">Your Team</Link>
                </li>
                <li className="nav-item ">
                    <Link className="nav-link " to="/post">Posts</Link>
                </li>
                <a href="/logout" onClick={this.onLogoutClick} className="nav-link" >
                    <img src={user.avatar} className='rounded-circle' style={{ width: '25px', marginRight: '10px' }} alt={user.name}></img>
                    Logout
                </a>
            </ul>
        );
        let guestLink = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item ">
                    <Link className="nav-link " to="/register">Register</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
            </ul>
        );
        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                    <div className="container">
                        <Link className="navbar-brand" to="/">
                            <img src={pokeball} width="25" height="30" alt=""></img>
                        </Link>
                        <Link className="navbar-brand" to="/">PokeConnecter</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="mobile-nav">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/trainers"> Trainers</Link>
                                </li>
                            </ul>
                            {isAuthenticated ? userLink : guestLink}
                        </div>
                    </div>
                </nav>

            </div>
        )
    }
}

Navbar.protoTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Navbar);