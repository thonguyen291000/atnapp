import React from "react"
import moment from "moment"

const ProjectSummary = ({project}) => {
    return (
        <div className="card z-depth-0 project-summary">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">({project.shopName}) <span className="blue-text text-darken-2">{project.title}</span></span>
                <p>Posted by {project.authFirstName} {project.authLastName}</p>
                <p className="grey-text">{moment(project.createAt.toDate()).format('LLLL')}</p>
            </div>
        </div>
    )
}

export default ProjectSummary;