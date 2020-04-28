import React from "react"
import {connect} from "react-redux"
import {firestoreConnect} from "react-redux-firebase"
import {compose} from "redux"
import moment from "moment"
import {Redirect} from "react-router-dom"
import {NumberFormat} from "../layout/NumberFormat"
import {Link} from "react-router-dom"
// MUI stuff
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';

const styles = {
    border: "double"
}

const styleTable = {
    backgroundColor: "white"
}

const ProjectAllTable = (props) => {
    console.log(props)
    const {auth} = props
    if(!auth.uid) return <Redirect to="/signin"/>

    const identifyRole = props.match.params.shopName;
    const projects = identifyRole === "root" ? props.projects && props.projects : props.projects && props.projects.filter(project => {
        return project.shopName === identifyRole
    })

    
    return (
        <div className="container section">
            <table className="highlight responsive-table" style={styles, styleTable}>
                <thead>
                <tr>
                    <th className="center" style={styles}>Created time</th>
                    <th className="center" style={styles}>Shop name</th>
                    <th className="center" style={styles}>Manger name</th>
                    <th className="center" style={styles}>Profit</th>
                    <th className="center" style={styles}>Note</th>
                    <th className="center" style={styles}>Action</th>
                </tr>
                </thead>
        
                <tbody>
                    {projects && projects.map(project => {
                        return (
                            <tr key={project.id}>
                                <td style={styles}>{moment(project.createAt.toDate().toString()).format('LLLL')}</td>
                                <td style={styles}>{project.shopName}</td>
                                <td style={styles}>{project.authLastName} {project.authFirstName}</td>
                                <td style={styles}>{NumberFormat(project.profit)}</td>
                                <td style={styles}>{project.note}</td>
                                <td style={styles}>
                                    <Tooltip title="View details" placement="top">
                                        <IconButton component={Link} to={"/project/" + identifyRole + "/" + project.id} className="button">
                                            <EditIcon color="action"/>
                                        </IconButton>
                                    </Tooltip>
                                </td>                      
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth
    }
}

export default compose(
    firestoreConnect([
        {collection: "projects", orderBy: ["createAt", "desc"]}
    ]),
    connect(mapStateToProps)
)(ProjectAllTable)