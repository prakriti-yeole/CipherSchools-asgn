import React, { useEffect, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast';
import httpService, { base_url } from '../../apis/config';
import { Comment, CommentForm } from '../index'

const Comments = ({ user, videoId, redirectToSignin }) => {

    const [backendComments, setBackendComments] = useState([]);
    // const [activeComment, setActiveComment] = useState(null);
    const rootComments = backendComments.filter(
        (backendComment) => backendComment.parentId === null
    );

    const getReplies = (commentId) =>
        backendComments
            .filter((backendComment) => backendComment.parentId === commentId)
            .sort(
                (a, b) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime()
            );

    const getComments = async (videoId) => {
        try {
            const response = await httpService.get(`${base_url}/getComments`, {
                params: {
                    videoId
                }
            });
            if (response.data.success) {
                setBackendComments(response.data.comments)
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(response.data.message);
        }
    }

    const addComment = async (text, parentId = null) => {
        const commentValues = {
            body: text,
            parentId: parentId,
            videoId: videoId,
            userId: user.userId,
            email: user.userEmail
        }
        try {
            const response = await httpService.post(`${base_url}/addComment`, { commentValues });
            console.log("response: ", response);
            if (response.data.success) {
                setBackendComments([response.data.newComment, ...backendComments]);
                // setActiveComment(null);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Network Error !!!");
        }
    };

    useEffect(() => {
        getComments(videoId);
    }, [])

    return (
        <>
            <div><Toaster /></div>
            <div className="comment-section">
                <p className='comment-heading'>Comments</p>
                <div className='comment-div'>
                    <CommentForm user={user} redirectToSignin={redirectToSignin} submitLabel="Comment" handleSubmit={addComment} />

                    <div className="comments">
                        {
                            rootComments.map((rootComment, index) => {
                                return <Comment key={rootComment._id} comment={rootComment} user={user} replies={getReplies(rootComment._id)} redirectToSignin={redirectToSignin} submitLabel="Comment" handleSubmit={addComment} />
                            })
                        }

                    </div>
                </div>
            </div>

        </>
    )
}

export default Comments