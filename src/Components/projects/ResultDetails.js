import React from 'react';
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import {Redirect} from "react-router-dom";
import moment from "moment";
import {Link} from "react-router-dom";
import {NumberFormat} from "../layout/NumberFormat";
import CreateComment from '../Comments/CreateComment';

// MUI stuff
import ListAlt from '@material-ui/icons/ListAlt';
import Button from '@material-ui/core/Button';

const style = {
    marginTop: "20px",
}

const handleViewAll = () => {
    const viewClick = document.getElementById('viewAll');
    viewClick.click();
}

const ProjectDetails = (props) => {
    const {project, auth, comments} = props;
    if(!auth.uid) return <Redirect to="/signin"/>
    const comment = comments ? comments.filter(comment => {
        return comment.saledResult === project.title
    }) : null;
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
                            }) : null} <span><CreateComment receiver={project.shopName} saledResult={project.title} idResult={props.match.params.id}/></span></li>
                            <li className="center-align">
                                <Link to={"/projects/" + props.profile.shopName} id="viewAll" hidden="hidden"></Link>
                                <Button onClick={handleViewAll} 
                                    variant="contained"
                                    color="primary"
                                    startIcon={<ListAlt />}>
                                        View all results
                                </Button>
                            </li>
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
