import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//component
//profile components
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileHeader from './ProfileHeader';
import ProfileInfo from './ProfileInfo';
//common
import Spinner from '../common/Spinner';
//actions
import { getProfileByHandle } from '../../actions/profileActions';

class Profile extends Component {
    componentDidMount() {
        if (this.props.match.params.handle) {
            this.props.getProfileByHandle(this.props.match.params.handle);
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.profile.profile === null && this.props.profile.loading) {
            this.props.history.push('/not-found');
        }
    }
    render() {
        let { profile, loading } = this.props.profile;
        let profileContent;
        if (profile === null || loading) profileContent = <Spinner />
        else {
            profileContent = (
                <div>
                    <div className="container">
                        <ProfileHeader profile={profile} />
                        <ProfileAbout profile={profile} />
                        <ProfileCreds experience={profile.experience} education={profile.education} />
                        {profile.github ? (<ProfileInfo username={profile.github} />) : (null)}
                    </div>
                </div>
            )
        }
        return (
            <div className="profile">
                <div className="container">
                    {profileContent}
                </div>
            </div>
        )
    }
}
Profile.propTypes = {
    getProfileByHandle: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfileByHandle })(Profile);