import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//Component
//common
import Textarea from '../common/Textarea';
//action
import { addComment } from '../../actions/postActions';

class CommentForm extends Component {
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
        let { text } = this.state, { name, avatar } = this.props.auth.user, { postId } = this.props;
        this.props.addComment(postId, { text, name, avatar });
        this.setState({ text: '' });
    }
    render() {
        let { err } = this.state;
        return (
            <div className="post-form mb-3">
                <div className="card card-info">
                    <div className="card-header bg-dark text-white">Make a Comement...</div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <Textarea
                                    placeholder="Reply to post"
                                    name="text"
                                    value={this.state.text}
                                    onChange={this.onChange}
                                    err={err.text} />
                            </div>
                            <button type="submit" className="btn btn-dark">Submit</button>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}
CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    err: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth,
    err: state.err
});
export default connect(mapStateToProps, { addComment })(CommentForm);