import React from "react"
import ResultSummary from "./ResultSummary"
import {Link} from "react-router-dom"

const ProjectList = (props) => {
    const projects = props.projects;
    const identifyRole = props.identifyRole;
    return (
        <div className="project-list section">
            {projects && projects.map(project => {
                return (
                    <Link to={"/project/" + identifyRole + "/" + project.id} key={project.id}>
                        <ResultSummary project={project} />
                    </Link>               
                )
            })}
        </div>
    )
}

export default ProjectList;