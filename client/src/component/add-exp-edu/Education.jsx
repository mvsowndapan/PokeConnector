import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
//component
//Common
import Textfield from '../common/Textfield';
import Textarea from '../common/Textarea';
//actions
import { addEducation } from '../../actions/profileActions';

class Education extends Component {
    constructor() {
        super();
        this.state = {
            school: '', description: '',
            specialist: '', degree: '', from: '',
            to: '', current: false, disabled: false,
            err: {}
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.err) { this.setState({ err: nextProps.err }) }
    }
    onChange = (e) => { this.setState({ [e.target.name]: e.target.value }) }
    onSubmit = (e) => {
        e.preventDefault();
        let { school, specialist, degree, description, from, to, current } = this.state;
        this.props.addEducation({ school, specialist, degree, description, from, to, current }, this.props.history);
    }
    onCheck = (e) => { this.setState({ disabled: !this.state.disabled, current: !this.state.current }) }

    render() {
        let { err } = this.state;
        return (
            <div className="add-education">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4  text-center">Add Education</h1>
                            <small className="lead text-center">Experience with the school</small><br></br><br></br>
                            <form onSubmit={this.onSubmit}>
                                <Textfield
                                    placeholder="* School"
                                    name="school"
                                    value={this.state.school}
                                    onChange={this.onChange}
                                    err={err.school}
                                    info="School Name"
                                />
                                <Textfield
                                    placeholder="*  Specialist"
                                    name="specialist"
                                    value={this.state.specialist}
                                    onChange={this.onChange}
                                    err={err.specialist}
                                    info="Specialist In"
                                />
                                <Textfield
                                    placeholder="Degree"
                                    name="degree"
                                    value={this.state.degree}
                                    onChange={this.onChange}
                                    err={err.degree}
                                    info="Degree In"
                                />
                                <Textarea
                                    name="description"
                                    value={this.state.description}
                                    placeholder="Description"
                                    onChange={this.onChange}
                                    info="Description about the game"
                                    err={err.description}
                                />
                                <h5>* From</h5>
                                <Textfield
                                    name="from"
                                    type="date"
                                    value={this.state.from}
                                    onChange={this.onChange}
                                    err={err.from}
                                />
                                <div className="form-check mb-4 text-left">
                                    <input
                                        type="checkbox"
                                        name="current"
                                        className="form-check-input"
                                        value={this.state.current}
                                        checked={this.state.checked}
                                        onChange={this.onCheck}
                                        id="current"
                                    />
                                    <label htmlFor="currentschool" className="form-check-label">Current School</label>
                                </div>
                                <h5>To</h5>
                                <Textfield
                                    name="to"
                                    type="date"
                                    value={this.state.to}
                                    onChange={this.onChange}
                                    err={err.to}
                                    disabled={this.state.disabled ? 'disabled' : ''}
                                />
                                <input type="submit" value="Add" className="btn btn-lg btn-outline-success" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Education.propTypes = {
    profile: PropTypes.object.isRequired,
    addEducation: PropTypes.func.isRequired,
    err: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    profile: state.profile,
    err: state.err
});
export default connect(mapStateToProps, { addEducation })(withRouter(Education));