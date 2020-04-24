import React from "react"
import {Link} from "react-router-dom"
import SignedInLinks from "./SignedInLinks"
import SignedOutLinks from "./SignedOutLinks"
import {connect} from "react-redux"
import SignedInLinksDirector from "./SignedInLinksDirector"
import Sidebar from "./Sidebar"
import Icons from "./Icons"

const Navbar = (props) => {
    
    const {auth, profile} = props;
    const regexAuth = /^root@[a-zA-z]+/;
    const links = auth.uid ? 
        regexAuth.test(auth.email) ? <SignedInLinksDirector auth={auth} profile={profile}/> :  <SignedInLinks  auth={auth} profile={profile}/> :<SignedOutLinks />;
    const icons = auth.uid ? <Icons profile={profile}/> :  null;
    return (
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to="/" className="brand-logo">SaleManage</Link>
                <a href="2" className="sidenav-trigger" data-target="mobile-menu">
                    <i className="material-icons">menu</i>
                </a>
                {links}   
                <Sidebar />
                {icons}
            </div>
        </nav>
        
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navbar);