import React, { Fragment } from 'react'
import {Link} from "react-router-dom"
// MUI stuff
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';


const HandleView = (props) => {
    
    console.log(props)
    const { project } = props;
    return (
        <Fragment>
           
            <Tooltip title="View details" placement="top">
                <IconButton component={Link} to={"/project/" + props.role + "/" + project.id} className="button">
                    <EditIcon color="red"/>
                </IconButton>
            </Tooltip>
        </Fragment> 
    )
}

export default HandleView
