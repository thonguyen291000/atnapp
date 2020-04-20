import React from "react"
import moment from "moment"

const CommentSummary = ({comment}) => {
    console.log(comment)
    return (
        <div className="card z-depth-0 comment-summary">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">{comment.title}</span>
                <p>{comment.sender} send to {comment.receiver}</p>
                <p className="grey-text">{moment(comment.createAt.toDate()).format('LLLL')}</p>
            </div>
        </div>
    )
}

export default CommentSummary;