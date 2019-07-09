import React, { Component } from 'react'
import PropTypes from 'prop-types';
//component
import PostItem from './PostItem';

class AllPosts extends Component {
    render() {
        let { posts } = this.props;
        return (
            <div>
                {posts.map(p => (<PostItem key={p._id} post={p} />))}

            </div>
        )
    }
}
AllPosts.propTypes = {
    posts: PropTypes.array.isRequired
}
export default AllPosts;