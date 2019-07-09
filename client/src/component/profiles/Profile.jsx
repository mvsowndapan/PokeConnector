import React, { Component } from 'react'
//redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//component 
//commmen
import Spinner from '../common/Spinner';
//profile component
import ProfileItem from './ProfileItem';
//actions
import { getProfiles } from '../../actions/profileActions';

class Profile extends Component {
    componentDidMount() {
        this.props.getProfiles();
    }
    render() {
        let { profiles, loading } = this.props.profile;
        let profileItems;
        if (profiles == null || loading) profileItems = <Spinner />;
        else {
            if (profiles.length > 0) profileItems = profiles.map(p => (
                <ProfileItem key={p._id} profile={p} />
            ));
            else profileItems = <h4>No Profiles Found !!!</h4>
        }
        return (
            <div className="allProfiles">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-6 text-center">Trainer's Profile</h1>
                            <p className="text-center">Browse and connect with the profile</p>
                            {profileItems}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
Profile.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    profile: state.profile
});
export default connect(mapStateToProps, { getProfiles })(Profile);