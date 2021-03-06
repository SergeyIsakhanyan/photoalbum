import React, { Component } from 'react'
import Post from '../components/Post'
import { connect } from 'react-redux'
import { addPost, editPost, deletePost, receivePosts } from '../actions.js'
import AddAPhoto from 'material-ui/svg-icons/image/add-a-photo'
import FlatButton from 'material-ui/FlatButton'
import PostActions from '../components/PostActions'
import Header from '../components/Header'
import appFetch from '../components/AppFetch'
import moment from 'moment/moment.js'

const mapStateToProps = (state, ownProps) => {
    return {
        posts: state.Posts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDeletePost: post => {
            appFetch('myposts/post_id', 'DELETE', post)
                .then(response => response.json())
                .then(() => dispatch(deletePost(post)))
        },

        onAddPost: post => {
            appFetch('myposts', 'POST', post)
                .then(response => response.json())
                .then(post => dispatch(addPost(post)))
        },

        onEditPost: post => {
            appFetch('myposts/post_id', 'POST', post)
                .then(response => response.json())
                .then(post => dispatch(editPost(post)))
        },

        onReceivePosts: () => {
            appFetch('myposts')
                .then(response => response.json())
                .then(posts => { let sorted = posts.sort((a, b) => (moment(b.date).diff(moment(a.date)))); return dispatch(receivePosts(sorted)) })
        }
    }
}

export class MyPostsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            posts: this.props.posts
        }
    }

    componentWillMount() { this.props.onReceivePosts() }

    componentWillReceiveProps(nextProps) {
        this.setState({ posts: nextProps.posts })
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.posts !== nextProps.props) {
            return true;
        }
        return false;
    }

    isOpen = () => (
        this.setState({ isOpen: true })
    )
    isClose = () => (
        this.setState({ isOpen: false })
    )

    isOpen = () => (
        this.setState({ isOpen: true })
    )
    isClose = () => (
        this.setState({ isOpen: false })
    )

    render() {
        return (
            <div>
                <Header />
                <div style={{
                    display: 'flex',
                    position: 'relative',
                    maxWidth: 700,
                    alignItems: 'stretch',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: 0,
                    paddingTop: 0
                }}>
                    <FlatButton
                        label="Add new photo"
                        labelPosition="after"
                        containerElement="label"
                        style={{ marginTop: 5, width: 700, height: 42 }}
                        icon={<AddAPhoto />}
                        onClick={this.isOpen}
                    >
                        <PostActions
                            onAddPost={this.props.onAddPost}
                            post={{}}
                            isOpen={this.state.isOpen}
                            isClose={this.isClose}
                            addPostFailed={''}
                        />
                    </FlatButton>
                </div>
                <div style={{
                    clear: 'both',
                    position: 'relative',
                    maxWidth: 700,
                    alignItems: 'stretch',
                    marginTop: 0,
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>
                    {
                        this.state.posts.length === 0 ?
                            <div style={{ color: 'grey', maxWidth: 700, textAlign: 'center', marginTop: 25 }}>
                                <p>You don't have any posts yet.</p>
                            </div>
                            :
                            this.state.posts.map((post) => (
                                <div key={post.post_id} style={{ margin: 0, marginTop: 5, maxWidth: 700 }}>
                                    <Post
                                        post={post}
                                        onDeletePost={this.props.onDeletePost}
                                        onEditPost={this.props.onEditPost}
                                        isMyPosts
                                    />
                                </div>
                            ))
                    }
                </div>
            </div>
        )
    }
}

const MyPosts = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MyPostsList)

export default MyPosts;

