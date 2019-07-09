import React, { Component } from 'react'
import PropTypes from 'prop-types';
//component
//post
import CommentItem from './CommentItem';

class CommentFeed extends Component {
    render() {
        let { comments, postId } = this.props;
        return (
            <div>
                {comments.map(c => <CommentItem key={c._id} comment={c} postId={postId} />)}
            </div>
        )
    }
}

CommentFeed.propTypes = { comments: PropTypes.array.isRequired, postId: PropTypes.string.isRequired }
export default CommentFeed;