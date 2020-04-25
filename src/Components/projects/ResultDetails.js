import React from 'react'
import {connect} from "react-redux"
import {firestoreConnect} from "react-redux-firebase"
import {compose} from "redux"
import {Redirect} from "react-router-dom"
import moment from "moment"
import {Link} from "react-router-dom"
import {NumberFormat} from "../layout/NumberFormat"

const style = {
    marginTop: "20px",
}

const ProjectDetails = (props) => {
    const {project, auth, comments} = props;
    if(!auth.uid) return <Redirect to="/signin"/>
    const comment = comments ? comments.filter(comment => {
        return comment.saledResult === project.title
    }) : null;
    console.log(comment)
    if (project) {
        return (
            <div className="container section">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <span className="card-title">{project.title}</span>
                        <ul>
                            <li>- Quantity of saled ball: {project.ball}</li>
                            <li>- Quantity of saled doll: {project.doll}</li>
                            <li>- Quantity of saled lego: {project.lego}</li>
                            <li>- Quantity of saled yoyo: {project.yoyo}</li>
                            <li>- Profit: {NumberFormat(project.profit)}</li>
                            <li>- Warehouse state: {project.warehouseState}</li>
                            <li>- Note: {project.note}</li>
                            <li>- Comment: {comment ? comment.map(subComment => {
                                return (
                                    <p>Comment {comment.indexOf(subComment)+1}. {subComment.content}</p>
                                )
                            }) : null}</li>
                            <div className="row" style={style}>
                                <div className="col s12 m6">
                                    <li className="center-align"><Link to={"/projects/" + props.profile.shopName} className="btn black white-text text-darken-4">All results</Link></li>
                                </div>
                                <div className="col s12 m5 offet-m1">
                                <li className="center-align"><Link to={"/comment/" + project.shopName + "/" + project.title} className="btn black white-text text-darken-4">Comments</Link></li>
                                </div>
                            </div>
                        </ul>
                    </div>
                    <div className="card-action grey lighten-4 grey-text">
                        <div>Posted by {project.authLastName} {project.authFirstName}</div>
                        <div>{moment(project.createAt.toDate()).format('LLLL')}</div>
                    </div>
                </div>
            </div>
        )
    } else {
        return(
            <div className="container center">Loading project...</div>
        ) 
    }  
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects;
    const comments = state.firestore.ordered.comments;
    const project = projects ? projects[id] : null;
    return {
        project : project,
        auth : state.firebase.auth,
        profile: state.firebase.profile,
        comments: comments
    }
}

export default compose(
    firestoreConnect(['projects', 'comments']),
    connect(mapStateToProps)
)(ProjectDetails)
