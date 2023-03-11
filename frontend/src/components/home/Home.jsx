import React, { useEffect, useState } from 'react'
import httpService, { base_url } from '../../apis/config';
import Header from '../header/Header'
import Videocard from '../video/Videocard'
// import Videos from '../../data/Videos.json';

const Home = ({ getLocalStorageData, user, setUser }) => {

    const [videos, setVideos] = useState([]);

    const getVideo = async () => {
        try {
            const response = await httpService.get(`${base_url}/getVideo`);
            if (response.data.success) {
                setVideos(response.data.video);
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getVideo();
    }, [])

    return (
        <>
            <div className='Home-section'>
                <Header getLocalStorageData={getLocalStorageData} user={user} setUser={setUser} />
                <div className="video-section container">
                    {
                        videos.map((videoData, index) =>
                            <Videocard key={index + videoData._id} videoData={videoData} getLocalStorageData={getLocalStorageData} />
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Home