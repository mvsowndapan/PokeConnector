import React from 'react'
import { Link } from 'react-router-dom';

const Profile = () => {
    return (
        <div className="btn-group mb-4" role="group">
            <Link to="/edit-profile" className="btn btn-light">
                <i className="fas fa-user-circle text-danger mr-1"></i> Edit Profile</Link>
            <Link to="/add-experience" className="btn btn-light">
                <i className="fab fa-black-tie text-success mr-1"></i>
                Add Experience</Link>
            <Link to="/add-education" className="btn btn-light">
                <i className="fas fa-graduation-cap text-warning mr-1"></i>
                Add Education</Link>
        </div>
    )
}
export default Profile;