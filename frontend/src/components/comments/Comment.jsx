import React, { useState } from 'react'
import CommentForm from './CommentForm';

const Comment = ({ user, comment, replies, redirectToSignin, handleSubmit, submitLabel }) => {

    const [activeComment, setActiveComment] = useState(null);
    const handleReply = () => {
        setActiveComment(comment._id);
    }

    return (
        <>
            <div className="new-comment">
                <p className="name">{comment.email}</p>
                <p className="user-comment">{comment.body}</p>
                <div className="replay-div" onClick={handleReply}>
                    {
                        user != null ?
                            <>
                                <img src="/reply.svg" alt="" />
                                <span>Reply</span>
                            </>

                            :
                            null
                    }
                </div>
                {
                    activeComment != null ?
                        <CommentForm user={user} redirectToSignin={redirectToSignin} submitLabel="Reply" handleSubmit={(text) => handleSubmit(text, activeComment)} />
                        : null
                }
                {
                    replies.length > 0 && (
                        <div className="reply-comment">
                            {
                                replies.map(reply => (
                                    <Comment key={reply._id} comment={reply} replies={[]} redirectToSignin={redirectToSignin} submitLabel="Comment" handleSubmit={handleSubmit} />
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default Comment