import mongoose from 'mongoose'
import { video_model } from '../models/video.model.js'

const Video = new mongoose.model("video", video_model);

const getVideo = async (req, res) => {

    try {
        const video = await Video.find({});
        return res.send({
            video: video,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.send({
            message: "Network Error",
            success: false
        })
    }
};


const updateLike = async (req, res) => {
    const { videoId, newLikes } = req.body;
    try {
        const video = await Video.findByIdAndUpdate(
            { _id: videoId },
            {
                $set: {
                    likes: newLikes
                }
            },
            { new: true }
        )
        if (video) {
            return res.send({
                success: true,
                message: "You liked a video",
                video: video
            })
        } else {
            return res.send({
                success: false,
                message: "Network Error ! Try after sometime",
            })
        }
    } catch (error) {
        console.log(error);
        return res.send({
            success: false,
            message: "Network Error ! Try after sometime",
        })
    }
}
export default getVideo;
export { updateLike };