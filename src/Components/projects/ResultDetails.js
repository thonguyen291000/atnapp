import React from 'react';
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import {Redirect} from "react-router-dom";
import moment from "moment";
import {Link} from "react-router-dom";
import {NumberFormat} from "../layout/NumberFormat";

// MUI stuff
import { IconButton } from '@material-ui/core';
import AddComment from '@material-ui/icons/AddComment';
import ListAlt from '@material-ui/icons/ListAlt';
import Tooltip from '@material-ui/core/Tooltip';

const style = {
    marginTop: "20px",
}

const handleViewAll = () => {
    const viewClick = document.getElementById('viewAll');
    viewClick.click();
}

const handleComment = () => {
    const comment = document.getElementById('comment');
    comment.click();
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
                                    <li className="center-align">
                                        <Link to={"/projects/" + props.profile.shopName} id="viewAll" hidden="hidden"></Link>
                                        <Tooltip title="All results" placement="top">
                                            <IconButton onClick={handleViewAll} className="button">
                                                <ListAlt color="secondary"/>
                                            </IconButton>
                                        </Tooltip>
                                    </li>
                                </div>
                                <div className="col s12 m5 offet-m1">
                                <li className="center-align">
                                    <Link to={"/comment/" + project.shopName + "/" + project.title} id="comment" hidden="hidden"></Link>
                                    <Tooltip title="Comment" placement="top">
                                        <IconButton onClick={handleComment} className="button">
                                            <AddComment color="secondary"/>
                                        </IconButton>
                                    </Tooltip>
                                </li>
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
