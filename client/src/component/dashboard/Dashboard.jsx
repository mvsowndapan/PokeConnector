import React, { Component } from 'react'
import { Link } from 'react-router-dom';
//redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//action
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
//component
//common-component
import Spinner from '../common/Spinner';
//dashboard
import Profile from './Profile';
import Exp from './Exp';
import Edu from './Edu';

class Dashboard extends Component {
  componentDidMount() { this.props.getCurrentProfile(); } //getting the current user
  onDeleteClick = () => {
    this.props.deleteAccount();
  }
  render() {
    let { user } = this.props.auth, { profile, loading } = this.props.profile;
    let dashboardContent;
    if (profile === null || loading) { dashboardContent = <Spinner /> } //Show Loading using spinner
    else {
      if (Object.keys(profile).length > 0) //chaeck whether user have the profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              <Link className="text-muted" to={`/profile/${profile.handle}`}>
                <button className="btn btn-outline-primary">{user.name}</button></Link>
            </p>
            <Profile />
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-6">
                  <Exp exp={profile.experience} />
                </div>
                <div className="col-md-6">
                  <Edu edu={profile.education} />
                </div>
              </div>
            </div>

            <div className="mt-3" />
            <button onClick={this.onDeleteClick} className="btn btn-danger">Delete My Account</button>
          </div>

        );
      else {
        dashboardContent = (
          <div>
            <p>You have not yet created the profile, Please add some info </p>
            <Link to="/create-profile" className="btn btn-lg btn-outline-dark">Create Profile</Link>
          </div >
        );
      }
    }

    return (
      <div className="dashboard text-center">
        <div className="row">
          <div className="col-md-12">
            <p className="display-4">Dashboard</p>
            {dashboardContent}
          </div>
        </div>
      </div>
    )
  }
};

Dashboard.protoTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStoreToProps = (state) => ({
  auth: state.auth,
  profile: state.profile

});
export default connect(mapStoreToProps, { getCurrentProfile, deleteAccount })(Dashboard);