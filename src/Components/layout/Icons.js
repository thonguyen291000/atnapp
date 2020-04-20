import React from "react"
import {NavLink} from "react-router-dom"

const Icons = (props) => {
    return (
        <ul className="right hide-on-large-only">
            <li><NavLink to="/" className="btn btn-floating pink lighten-1">
                {props.profile.initials}
            </NavLink></li>
        </ul>
    )
}

export default Icons