import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//Component
//common
import Textarea from '../common/Textarea';
//action
import { addPost } from '../../actions/postActions';

class PostForm extends Component {
    constructor() {
        super();
        this.state = {
            text: '',
            err: {}
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.err) this.setState({ err: nextProps.err });
    }
    onChange = (e) => { this.setState({ [e.target.name]: e.target.value }); }
    onSubmit = (e) => {
        e.preventDefault();
        let { text } = this.state, { name, avatar } = this.props.auth.user;
        this.props.addPost({ text, name, avatar });
        this.setState({ text: '' });
    }
    render() {
        let { err } = this.state;
        return (
            <div className="post-form mb-3">
                <div className="card card-info">
                    <div className="card-header bg-dark text-white">
                        Say Somthing...
              </div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <Textarea placeholder="Create a post" name="text" value={this.state.text}
                                    onChange={this.onChange} err={err.text} />
                            </div>
                            <button type="submit" className="btn btn-dark">Submit</button>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}
PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    err: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth,
    err: state.err
});
export default connect(mapStateToProps, { addPost })(PostForm);