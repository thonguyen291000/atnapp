import React, { Component } from 'react'
import {connect} from "react-redux"
import {createComment} from "../../store/actions/projectAction"
import {Redirect} from "react-router-dom"

class CreateComment extends Component {
    state = {
        title: "",
        content: "",
        receiver: this.props.match.params.receiver,
        saledResult: this.props.match.params.saledResult
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createComment(this.state)
        this.props.history.push("/")
    }
    render() {
        const {auth} = this.props;
        if(!auth.uid) return <Redirect to="/signin"/>
        const {profile} = this.props;
        if (profile.shopName === this.props.match.params.receiver) {
            this.setState({
                ...this.state,
                receiver: "root"
            })
        }
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-4">Create new comment</h5>
                    <div className="input-field">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="content">Content</label>
                        <textarea id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Comment</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createComment: (comment) => dispatch(createComment(comment))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateComment)
