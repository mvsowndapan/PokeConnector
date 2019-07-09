import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
//actions
import { deletePost, like, unlike } from '../../actions/postActions';

class PostItem extends Component {
    DeleteClick(id) { this.props.deletePost(id); }
    likePost(id) { this.props.like(id); }
    unlikePost(id) { this.props.unlike(id); }
    checkLikes = (likes) => {
        let { auth } = this.props;
        if (likes.filter(l => l.user === auth.user.id).length > 0) return true;
        else return false;
    }
    render() {
        let { auth, post, showActions } = this.props;
        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <Link to="/profile"><img className="rounded-circle d-none d-md-block" src={post.avatar} alt="" /></Link><br />
                        <p className="text-center">{post.name}</p>
                    </div>
                    <div className="col-md-10">
                        <p className="lead">{post.text}</p>
                        {showActions ? (
                            <span>
                                <button onClick={this.likePost.bind(this, post._id)} type="button" className="btn btn-light mr-1">
                                    <i className={classnames('fas fa-thumbs-up', {
                                        'text-success': this.checkLikes(post.likes)
                                    })}></i>
                                    <span className="badge badge-light">{post.likes.length}</span>
                                </button>
                                <button onClick={this.unlikePost.bind(this, post._id)} type="button" className="btn btn-light mr-1">
                                    <i className="text-secondary fas fa-thumbs-down"></i>
                                </button>
                                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">Comments</Link>
                                {post.user === auth.user.id ? (
                                    <button onClick={this.DeleteClick.bind(this, post._id)} className="btn btn-outline-danger mr-1">
                                        <i className="fas fa-times"></i>
                                    </button>
                                ) : null}
                            </span>
                        ) : null}
                    </div>
                </div>
            </div>
        )
    }
}

PostItem.defaultProps = { showActions: true }
PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    like: PropTypes.func.isRequired,
    unlike: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth,
});
export default connect(mapStateToProps, { deletePost, like, unlike })(PostItem);
