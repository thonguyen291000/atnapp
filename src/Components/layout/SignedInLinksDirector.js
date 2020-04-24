import React from "react"
import {NavLink} from "react-router-dom"
import {connect} from "react-redux"
import {signOut} from "../../store/actions/authAction"

const SignedInLinksDirector = (props) => {
    return (
        <ul className="right hide-on-med-and-down">
            <li><NavLink to={"/projects/" + props.profile.shopName}>All Results</NavLink></li>
            <li><a onClick={props.signOut}>Log Out</a></li>
            <li><NavLink to={"/user/"+ props.auth.uid} className="btn btn-floating pink lighten-1">
                {props.profile.initials}
            </NavLink></li>
        </ul>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => {dispatch(signOut())}
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinksDirector);