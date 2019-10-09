import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//format date
import Moment from 'react-moment';
//action
import { deleteEducation } from '../../actions/profileActions';
import '../../App.css';
class Edu extends Component {
    deleteEdu(id) {
        this.props.deleteEducation(id);
    }
    render() {
        const education = this.props.edu.map(e => (
            <tr key={e._id}>
                <td>{e.school}</td>
                <td>{e.degree}</td>
                <td>{e.specialist}</td>
                <td><Moment format="YYYY/MM/DD">{e.from}</Moment> -
                {e.to === null ? (' Now') : (<Moment format="YYYY/MM/DD">{e.to}</Moment>)}
                </td>
                <td><button onClick={this.deleteEdu.bind(this, e._id)} className="btn btn-outline-danger">Delete</button> </td>
            </tr>
        ));
        return (
            <div className="edu">
                <h4 className="mb-4">Education</h4>
                <table className="table over">
                    <thead>
                        <tr>
                            <td><b>School</b></td>
                            <td><b>Degree</b></td>
                            <td><b>Specialist</b></td>
                            <td><b>Years</b></td>
                            <td><b>Option</b></td>
                        </tr>
                        {education}
                    </thead>
                </table>
            </div>
        )
    }
}

Edu.propTypes = {
    deleteEducation: PropTypes.func.isRequired
}
export default connect(null, { deleteEducation })(Edu);