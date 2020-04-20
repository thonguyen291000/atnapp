import React, {Component} from "react";
import Notifications from "./Notifications"
import ResultList from "../projects/ResultList"
import {connect} from "react-redux"
import {firestoreConnect} from "react-redux-firebase"
import {compose} from "redux"
import {Redirect} from "react-router-dom"
import CommentList from "../Comments/CommentList";


class Dashboard extends Component {
    render() {
        const {projects, auth, notifications, profile, comments} = this.props
        if(!auth.uid) return <Redirect to="/signin"/>
        
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m5">
                        <ResultList projects={projects} profile={profile} comments={comments}/>
                    </div>
                    <div className="col s12 m4">
                        <CommentList comments={comments} profile={profile}/>
                    </div>
                    <div className="col s12 m3">
                        <Notifications notifications={notifications}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications,
        profile: state.firebase.profile,
        comments: state.firestore.ordered.comments
    }
}

export default compose(
    firestoreConnect([
        {collection: 'projects', orderBy: ["createAt", "desc"]},
        {collection: 'notifications', limit: 3, orderBy: ["time", "desc"]},
        {collection: 'comments', orderBy: ["createAt", "desc"]}
    ]),
    connect(mapStateToProps)
)(Dashboard)