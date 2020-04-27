import React, { Component, Fragment } from 'react';
import {connect} from "react-redux";
import {createComment} from "../../store/actions/projectAction";
// MUI stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
// Icons
import AddComment from '@material-ui/icons/AddComment';

const styles = {
    textField: {
        margin: '10px auto 10px auto'
      },
}

class CreateComment extends Component {
    state = {
        title: "",
        content: "",
        receiver: this.props.profile.shopName === this.props.receiver ? "root" : this.props.receiver,
        saledResult: this.props.saledResult,
        open: false
    }
    handleOpen = () => {
        this.setState({ open: true });
    }
    handleClose = () => {
        this.setState({ open: false });
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    handleSubmit = () => {
        const comment = {
            title: this.state.title,
            content: this.state.content,
            receiver: this.props.profile.shopName === this.props.receiver ? "root" : this.props.receiver,
            saledResult: this.props.saledResult,
        };
        this.props.createComment(comment);
        this.handleClose();
    }
    render() {

        return (
            <Fragment>
                <Tooltip title="Comment" placement="top">
                    <IconButton onClick={this.handleOpen} className="iconButton">
                        <AddComment color="secondary"/>
                    </IconButton>
                </Tooltip>
                <Dialog open={this.state.open} onClose={this.handleClose} maxWidth="sm">
                    <DialogTitle>Your Comment</DialogTitle>
                    <DialogContent>
                            <TextField 
                                name="title" 
                                type="text" 
                                label="Title"  
                                multiline
                                rows="2"
                                placeholder="Title of comment"
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <TextField 
                                name="content" 
                                type="text" 
                                label="Content" 
                                multiline
                                rows="5"
                                placeholder="Content of comment"
                                onChange={this.handleChange}
                                fullWidth
                            />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Send
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createComment: (comment) => dispatch(createComment(comment))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateComment)
