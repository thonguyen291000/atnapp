import React from "react"
import {NavLink} from "react-router-dom"
import {connect} from "react-redux"
import {signOut} from "../../store/actions/authAction"

const BurgerMenu = (props) => {
    const regexAuth = /^root@[a-zA-z]+/;

    if (props.auth.uid) {
        if (regexAuth.test(props.auth.email)) {
            return (
                <ul className="sidenav grey lighten-2" id="mobile-menu">
                    <li><NavLink to={"/projects/" + props.profile.shopName}>All result</NavLink></li>
                    <li><a href="2" onClick={props.signOut}>Log Out</a></li>
                </ul>
            )
        } else {
            return (
                <ul className="sidenav grey lighten-2" id="mobile-menu">
                    <li><NavLink to={"/projects/" + props.profile.shopName}>Created Results</NavLink></li>
                    <li><NavLink to="/create">New Saled Result</NavLink></li>
                    <li><a href="2" onClick={props.signOut}>Log Out</a></li>
                </ul>
            )
        }
    } else {
        return (
            <ul className="sidenav grey lighten-2" id="mobile-menu">
                <li><NavLink to="/signup">Signup</NavLink></li>
                <li><NavLink to="/signin">Login</NavLink></li>
            </ul>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => {dispatch(signOut())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerMenu);