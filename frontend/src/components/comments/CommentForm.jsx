import React, { useState } from 'react'
import { toast, Toaster } from 'react-hot-toast';

const CommentForm = ({ user, redirectToSignin, submitLabel, handleSubmit, setActiveComment }) => {

    const [text, setText] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();

        if (text === "") {
            toast.error("Please write something to comment");
        } else {
            handleSubmit(text);
            setActiveComment(null);
            setText("");
        }
    }

    return (
        <>
            <div><Toaster /></div>
            {
                user != null ?
                    <form onSubmit={onSubmit}>
                        <input type="text" placeholder='Add a comment' value={text} onChange={(e) => setText(e.target.value)} />
                        <button type='submit'>{submitLabel}</button>
                    </form>
                    :
                    <div className="comment-error">
                        <button onClick={redirectToSignin}>Sign in to add comment or reply</button>
                    </div>
            }
        </>
    )
}

export default CommentForm