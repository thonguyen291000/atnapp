import React from "react"
import moment from "moment"

const CommentList = (props) => {
    const identifyRole =props.profile.shopName;
    const comments = props.comments ? props.comments.filter(comment => {
        return comment.receiver === identifyRole
    }) : null;
    return (
            <div className="section">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <span className="card-title">Comments</span>
                        <ul className="notifications">
                            {comments && comments.map(comment => {
                                return(
                                    <li key={comment.id}>
                                        <p>
                                            <span className="red-text">{comment.sender} </span> 
                                            <span>sended to </span>
                                            <span className="red-text">{comment.receiver} </span> 
                                            <span>at </span> 
                                            <span className="blue-text">{comment.saledResult}</span>
                                        </p>
                                        <p className="grey-text">{moment(comment.createAt.toDate()).fromNow()}</p>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
    )
}

export default CommentList;