import React, { Component, Fragment } from 'react'

// MUI stuff
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutLine from '@material-ui/icons/DeleteOutline';

import { connect } from 'react-redux';
import { deleteResult } from '../../store/actions/resultAction';

class DeleteResult extends Component {
    state = {
        open: false
    };
    handleOpen = () => {
        this.setState({ open: true });
    }
    handleClose = () => {
        this.setState({ open: false });
    }
    deleteScream = () => {
        this.props.deleteResult(this.props.resultId);
        this.setState({
            open: false 
        });
        this.props.history.push(`/projects/${this.props.role}`);
    }
    render() {
        return (
            <Fragment>
                <Tooltip title="Delete result" placement="top" className="deleteButton">
                    <IconButton onClick={this.handleOpen} className="iconButton">
                        <DeleteOutLine color="secondary"/>
                    </IconButton>
                </Tooltip>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <DialogTitle>
                        Are you sure you want to delete this result?
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.deleteScream} color="secondary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

export default connect(null, { deleteResult })(DeleteResult);
