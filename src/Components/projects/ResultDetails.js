import React from 'react';
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import {Redirect} from "react-router-dom";
import moment from "moment";
import {Link} from "react-router-dom";
import {NumberFormat} from "../layout/NumberFormat";
import CreateComment from '../Comments/CreateComment';
import DeleteResult from './DeleteResult';

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
    const {project, auth, comments, profile} = props;
    if(!auth.uid) return <Redirect to="/signin"/>
    const comment = comments ? comments.filter(comment => {
        return comment.saledResult === project.title
    }) : null;
    if (project) {
        return (
            <div className="container section">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <span className="card-title" style={{fontWeight: 'bold'}}>{project.title}</span>
                        {props.match.params.role !== "root" && <div className="div-delete-button"><DeleteResult resultId={props.match.params.id} history={props.history} role={props.match.params.role}/></div>}
                        <ul>
                            <li>- Quantity of saled ball: {project.ball}</li>
                            <hr/>
                            <li>- Quantity of saled doll: {project.doll}</li>
                            <hr/>
                            <li>- Quantity of saled lego: {project.lego}</li>
                            <hr/>
                            <li>- Quantity of saled yoyo: {project.yoyo}</li>
                            <hr/>
                            <li>- Profit: {NumberFormat(project.profit)}</li>
                            <hr/>
                            <li>- Warehouse state: {project.warehouseState}</li>
                            <hr/>
                            <li>- Note: {project.note}</li>
                            <hr/>
                            <li>- Comment: {comment ? comment.map(subComment => {
                                return (
                                    <p>Comment {comment.indexOf(subComment)+1}. Title: {subComment.title} / Content: {subComment.content}</p>
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
