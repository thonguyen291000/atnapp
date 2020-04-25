import React, { Component } from 'react'
import {connect} from "react-redux"
import {createProject} from "../../store/actions/projectAction"
import {Redirect} from "react-router-dom"
import {firestoreConnect} from "react-redux-firebase"
import {compose} from "redux"

class CreateProject extends Component {
    state = {
        title: "",
        ball: 0,
        doll: 0,
        lego: 0,
        yoyo: 0,
        profit: 0,
        warehouseState: "",
        note: "",
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value,
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const stock = this.props.stocks[0];
        const ball = this.state.ball;
        const doll = this.state.doll;
        const lego = this.state.lego;
        const yoyo = this.state.yoyo;
        const profit = ball * 5 + doll * 7 + lego * 20 + yoyo * 15;
        const result = {
            ...this.state,
            profit: profit,
            stocks: stock
        }
        this.props.createProject(result)
        this.props.history.push("/")
    }
    render() {
        const {auth} = this.props;
        if(!auth.uid) return <Redirect to="/signin"/>

        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-4">Create new sale result</h5>
                    <div className="input-field">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="ball">Quantity of saled ball</label>
                        <input type="number" id="ball" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="doll">Quantity of saled doll</label>
                        <input type="number" id="doll" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="lego">Quantity of saled lego</label>
                        <input type="number" id="lego" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="yoyo">Quantity of saled yoyo</label>
                        <input type="number" id="yoyo" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="warehouseState">Warehouse state</label>
                        <input type="text" id="warehouseState" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="note">Note</label>
                        <textarea id="note" className="materialize-textarea" onChange={this.handleChange}></textarea>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Create</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        stocks: state.firestore.ordered.stocks
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createProject: (project) => dispatch(createProject(project))
    }
}

export default compose(
    firestoreConnect([
        {collection: 'stocks'}
    ]),
    connect(mapStateToProps, mapDispatchToProps)
)(CreateProject)