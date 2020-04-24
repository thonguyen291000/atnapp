import React, { Component } from 'react'
import {connect} from "react-redux"
import {firestoreConnect} from "react-redux-firebase"
import {compose} from "redux"
import {Redirect} from "react-router-dom"
import {updateUser} from "../../store/actions/authAction"

class UserDetail extends Component {
    state = {
        id: "",
        firstName: "",
        lastName: "",
        shopName: "",
        errors: null
    }

    componentDidMount = () => {
        this.setState({
            ...this.state,
            errors: this.props.authError
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value,
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const state = this.state;
        const { user } = this.props;
        let userData = {};
        userData.id = this.props.match.params.id;
        userData.firstName = state.firstName === "" ? user.firstName : state.firstName;
        userData.lastName = state.lastName === "" ? user.lastName : state.lastName;
        userData.shopName = state.shopName === "" ? user.shopName : state.shopName;
        this.props.updateUser(userData);
        this.props.history.push('/');
    }
    render() {
        const { user, auth, authError } = this.props;
        let currentError;
        if (this.state.errors === authError) {
            currentError = null;
        } else {
            currentError = authError;
        }
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-4">User Details</h5>
                    <div className="input-field">
                        <label htmlFor="firstName">First Name - ({user ? user.firstName : null})</label>
                        <input type="text" id="firstName" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName">Last Name - ({user ? user.lastName : null})</label>
                        <input type="text" id="lastName" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="shopName">Shop's name - ({user ? user.shopName : null})</label>
                        <input type="text" id="shopName" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Update</button>
                        <div className="red-text center">
                            {currentError ? <p>{currentError}</p> : null}
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const users = state.firestore.ordered.users;
    const user = users ? users.find((user) => {
        return user.id === id
    }) : null;
    return {
        user: user,
        auth : state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (userData) => {dispatch(updateUser(userData))}
    }
}

export default compose(
    firestoreConnect([
        {collection: "users"}
    ]),
    connect(mapStateToProps, mapDispatchToProps)
)(UserDetail)
