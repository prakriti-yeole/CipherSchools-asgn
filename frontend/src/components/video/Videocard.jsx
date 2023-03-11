import React, { useRef, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import httpService, { base_url } from '../../apis/config';
import { Comments } from '../index';

const Videocard = ({ videoData, getLocalStorageData }) => {

    const navigate = useNavigate();

    const videoRef = useRef();
    const modalRef = useRef();

    const [user, setUser] = useState(getLocalStorageData);
    const [liked, setLiked] = useState(false);

    const handleVideoPlayer = () => {
        videoRef.current.pause();
    }

    const updateLikes = async (videoId, newLikes) => {
        try {
            const response = await httpService.post(`${base_url}/updateLike`, { videoId, newLikes });
            if (response.data.success) {
                setLiked(!liked);
                videoData.likes = response.data.video.likes;
            }
        } catch (error) {
            console.log(error);
            toast.error("Network Error");
        }
    }

    const redirectToSignin = () => {
        modalRef.current.click();
        navigate('/signin');
    }

    const handleVideoLike = () => {
        console.log(user);
        if (user === null) {
            toast.error("Sign in to make your opinion count");
        } else {
            if (liked === false) {
                updateLikes(videoData._id, videoData.likes + 1);
            } else {
                updateLikes(videoData._id, videoData.likes - 1);
            }
        }
    }
    return (
        <>

            <div className="video-card" data-bs-toggle="modal" data-bs-target={`#videoModal${videoData._id}`}>
                <div>
                    <video autoPlay={false} muted controls={false}>
                        <source src={videoData.src} type="video/mp4" />
                    </video>
                </div>
                <div className="video-details">
                    <p className="video-title">{videoData.title}</p>
                    <span>{videoData.description}</span>
                </div>
            </div>

            {/* Full screen modal */}
            <div className="modal fade" id={`videoModal${videoData._id}`}>
                <div><Toaster /></div>
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title">{videoData.title}</h1>
                            <button type="button" ref={modalRef} className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleVideoPlayer}></button>
                        </div>
                        <div className="modal-body">
                            <div className="modal-body-div">
                                <div className="video-div">
                                    <video ref={videoRef} autoPlay muted controls>
                                        <source src={videoData.src} type="video/mp4" />
                                    </video>
                                </div>
                                <div className="video-destails-section">
                                    <h1>{videoData.title}</h1>
                                    <p className='video-description'>{videoData.description}</p>
                                    <div className="interaction">
                                        <div className="interaction-section">
                                            <img src="/play.svg" alt="" />
                                            <span>{videoData.views}</span>
                                        </div>
                                        <div className="interaction-section" onClick={handleVideoLike}>
                                            <img src={`${liked ? '/like-fill.svg' : '/like-line.svg'}`} alt="" />
                                            <span>{videoData.likes}</span>
                                        </div>
                                        <div className="interaction-section">
                                            <img src="/comment.svg" alt="" />
                                            <span>{videoData.comments}</span>
                                        </div>
                                        <div className="interaction-section">
                                            <img src="/share.svg" alt="" />
                                            <span>Share</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Comments user={user} videoId={videoData._id} redirectToSignin={redirectToSignin} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Videocard