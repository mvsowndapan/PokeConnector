import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//component
//post
import PostForm from './PostForm';
//common
import Spinner from '../common/Spinner';
//actions
import { getPosts } from '../../actions/postActions';
//post
import AllPosts from './AllPosts';

class Posts extends Component {
    componentDidMount() {
        this.props.getPosts();
    }
    render() {
        let { posts, loading } = this.props.post, postContent;
        if (posts === null || loading) postContent = <Spinner />
        else postContent = <AllPosts posts={posts} />

        return (
            <div className="post">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <PostForm />
                            <h1>Your Posts</h1>
                            {postContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    post: state.post
})
export default connect(mapStateToProps, { getPosts })(Posts);