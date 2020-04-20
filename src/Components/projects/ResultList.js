import React from "react"
import ResultSummary from "./ResultSummary"
import {Link} from "react-router-dom"

const ProjectList = (props) => {
    const identifyRole =props.profile.shopName;
    const projects = identifyRole === "root" ? props.projects && props.projects : props.projects && props.projects.filter(project => {
        return project.shopName === identifyRole
    })
    return (
        <div className="project-list section">
            {projects && projects.map(project => {
                return (
                    <Link to={"/project/" + project.id} key={project.id}>
                        <ResultSummary project={project} />
                    </Link>               
                )
            })}
        </div>
    )
}

export default ProjectList;