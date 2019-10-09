import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//component
//common
import Spinner from '../common/Spinner';
//posts
import PostItem from '../posts/PostItem';
//post
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';

import { getPost } from '../../actions/postActions';

class Post extends Component {
    componentDidMount() {
        this.props.getPost(this.props.match.params.id);
    }
    render() {
        let { loading, post } = this.props.post, postContent;
        if (post === null || loading || Object.keys(post).length === 0) postContent = <Spinner />
        else postContent = (<div>
            <PostItem post={post} showActions={false} />
            <CommentForm postId={post._id} />
            <CommentFeed postId={post._id} comments={post.comments} />
        </div>);
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {postContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
Post.propTypes = {
    post: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    post: state.post
})
export default connect(mapStateToProps, { getPost })(Post);