import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class Landing extends Component {
    componentDidMount() {
        if (this.props.auth.isAuthenticated) this.props.history.push('/dashboard');
    }
    render() {
        return (
            <div>
                <div className="landing">
                    <div className="dark-overlay landing-inner text-light">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <h1 className="display-5 mb-4">PokeConnecter</h1>
                                    <p className="lead"> Create a Trainer profile/portfolio, share posts and get knowledge from other trainers</p>
                                    <hr />
                                    <Link to="/register" className="btn btn-lg btn-dark mr-2">Register</Link>
                                    <Link to="/login" className="btn btn-lg btn-light">Login</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired
};
const mapStoreToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStoreToProps)(Landing);