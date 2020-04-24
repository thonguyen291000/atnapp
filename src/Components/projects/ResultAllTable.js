import React from "react"
import {connect} from "react-redux"
import {firestoreConnect} from "react-redux-firebase"
import {compose} from "redux"
import moment from "moment"
import {Link} from "react-router-dom"
import {Redirect} from "react-router-dom"
import {NumberFormat} from "../layout/NumberFormat"

const styles = {
    border: "double"
}

const styleTable = {
    backgroundColor: "white"
}

const ProjectAllTable = (props) => {
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
                        console.log(project)
                        return (
                            <tr>
                                <td style={styles}>{moment(project.createAt.toDate().toString()).format('LLLL')}</td>
                                <td style={styles}>{project.shopName}</td>
                                <td style={styles}>{project.authLastName} {project.authFirstName}</td>
                                <td style={styles}>{NumberFormat(project.profit)}</td>
                                <td style={styles}>{project.note}</td>
                                <td style={styles}><Link to={"/project/" + project.id} key={project.id} className="red-text text-darken-4">View Details</Link></td>                      
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