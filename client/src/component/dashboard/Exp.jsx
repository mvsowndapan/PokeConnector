import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//format date
import Moment from 'react-moment';
//action
import { deleteExperience } from '../../actions/profileActions';

class Exp extends Component {
    deleteExp(id) {
        this.props.deleteExperience(id);
    }
    render() {
        const experience = this.props.exp.map(e => (
            <tr key={e._id}>
                <td>{e.title}</td>
                <td><Moment format="YYYY/MM/DD">{e.from}</Moment> -
                {e.to === null ? (' Now') : (<Moment format="YYYY/MM/DD">{e.to}</Moment>)}
                </td>
                <td><button onClick={this.deleteExp.bind(this, e._id)} className="btn btn-outline-danger">Delete</button> </td>
            </tr>
        ));
        return (
            <div className="Exp">
                <h4 className="mb-4">Experience</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <td><b>Title</b></td>
                            <td><b>Years</b></td>
                            <td><b>Option</b></td>
                        </tr>
                        {experience}
                    </thead>
                </table>
            </div>
        )
    }
}

Exp.propTypes = {
    deleteExperience: PropTypes.func.isRequired
}
export default connect(null, { deleteExperience })(Exp);
