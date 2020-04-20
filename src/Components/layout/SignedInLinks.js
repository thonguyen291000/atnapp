import React from "react"
import {NavLink} from "react-router-dom"
import {connect} from "react-redux"
import {signOut} from "../../store/actions/authAction"

const SignedInLinks = (props) => {
    return (
        <ul className="right hide-on-med-and-down">
            <li><NavLink to={"/projects/" + props.profile.shopName}>Created Results</NavLink></li>
            <li><NavLink to="/create">New Saled Result</NavLink></li>
            <li><a onClick={props.signOut}>Log Out</a></li>
            <li><NavLink to="/" className="btn btn-floating pink lighten-1">
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

export default connect(null, mapDispatchToProps)(SignedInLinks);