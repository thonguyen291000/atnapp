import React, {Component} from "react";
import Notifications from "./Notifications"
import ResultList from "../projects/ResultList"
import {connect} from "react-redux"
import {firestoreConnect} from "react-redux-firebase"
import {compose} from "redux"
import {Redirect} from "react-router-dom"
import CommentList from "../Comments/CommentList";
import StockInfo from "../projects/StockInfo";
import NoResult from "../projects/NoResult";


class Dashboard extends Component {
    render() {
        const { projects, stocks, auth, notifications, profile, comments} = this.props
        if(!auth.uid) return <Redirect to="/signin"/>
        const identifyRole = profile.shopName;
        const roleProjects = identifyRole === "root" ? projects : projects && projects.filter(project => {
            return project.shopName === identifyRole
        })
        if(roleProjects){
            return (
                <div className="dashboard container">
                    <div className="row">
                        <div className="col s12 m3">
                            <Notifications notifications={notifications}/>
                        </div>
                        <div className="col s12 m3">
                            <CommentList comments={comments} profile={profile}/>
                        </div>
                        <div className="col s12 m3">
                            <StockInfo profile={profile} projects={projects} stocks={stocks}/>
                        </div>
                        <div className="col s12 m3">
                            <ResultList projects={roleProjects} profile={profile} comments={comments}/>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="dashboard container">
                    <div className="row">
                        <div className="col s12 m3">
                            <Notifications notifications={notifications}/>
                        </div>
                        <div className="col s12 m3">
                            <CommentList comments={comments} profile={profile}/>
                        </div>
                        <div className="col s12 m3">
                            <StockInfo profile={profile} projects={roleProjects}/>
                        </div>
                        <div className="col s12 m3">
                            <NoResult/>
                        </div>
                    </div>
                </div>
            )
        }    
    }
}

const mapStateToProps = (state) => {
    return {
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications,
        profile: state.firebase.profile,
        comments: state.firestore.ordered.comments,
        stocks: state.firestore.ordered.stocks
    }
}

export default compose(
    firestoreConnect([
        {collection: 'projects', orderBy: ["createAt", "desc"]},
        {collection: 'notifications', limit: 3, orderBy: ["time", "desc"]},
        {collection: 'comments', orderBy: ["createAt", "desc"]},
        {collection: 'stocks'}
    ]),
    connect(mapStateToProps)
)(Dashboard)