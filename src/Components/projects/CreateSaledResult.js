import React, { Component } from 'react'
import {connect} from "react-redux"
import {createProject} from "../../store/actions/projectAction"
import {Redirect} from "react-router-dom"

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
            [e.target.id] : e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createProject(this.state)
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
                        <label htmlFor="profit">Profit</label>
                        <input type="number" id="profit" onChange={this.handleChange} />
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
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createProject: (project) => dispatch(createProject(project))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)
