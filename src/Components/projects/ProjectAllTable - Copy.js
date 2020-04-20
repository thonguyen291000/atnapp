import React from "react"
import {connect} from "react-redux"
import {firestoreConnect} from "react-redux-firebase"
import {compose} from "redux"
import moment from "moment"
import {Link} from "react-router-dom"
import {Redirect} from "react-router-dom"

const ProjectAllTable = (props) => {
    const {auth} = props
    if(!auth.uid) return <Redirect to="/signin"/>

    const identifyRole = props.match.params.shopName;
    const projects = identifyRole === "root" ? props.projects && props.projects : props.projects && props.projects.filter(project => {
        return project.shopName == identifyRole
    })

    
    return (
        <div className="container">
            <table className="highlight responsive-table">
            <thead>
              <tr>
                <th>Created time</th>
                <th>Shop name</th>
                <th>Manger name</th>
                <th>Saled balls</th>
                <th>Saled dolls</th>
                <th>Saled legos</th>
                <th>Saled yoyos</th>
                <th>Total profit</th>
                <th>Warehourse state</th>
                <th>Warning note</th>
                <th>Action</th>
              </tr>
            </thead>
    
            <tbody>
                {projects && projects.map(project => {
                    console.log(project)
                    return (
                        <tr>
                            <td>{moment(project.createAt.toDate().toString()).format('LLLL')}</td>
                            <td>{project.shopName}</td>
                            <td>{project.authLastName} {project.authFirstName}</td>
                            <td>{project.ball}</td>
                            <td>{project.doll}</td>
                            <td>{project.lego}</td>
                            <td>{project.yoyo}</td>
                            <td>{project.profit}</td>
                            <td>{project.warehouseState}</td>
                            <td>{project.note}</td>
                            <td><Link to={"/project/" + project.id} key={project.id} className="red-text text-darken-4">View Details</Link></td>                      
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
    firestoreConnect(["projects"]),
    connect(mapStateToProps)
)(ProjectAllTable)