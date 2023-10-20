import React from 'react'
import axios from 'axios';
import {useEffect, useState} from 'react'

const CurrentTrack = (props) => {
    const {token} = props;
    const {track, setTrack} = useState({})
    useEffect(()=>{
        axios.get(`https://api.spotify.com/v1/me/player/currently-playing`)
            .then(res=> {
                setTrack(res.item.TrackObject)
                console.log(res.item.TrackObject)
            }).catch(err => console.log(err))
    }, [])
    return (
        <div>
            <p>{JSON.stringify(track)}</p>
        </div>
    )
}

export default CurrentTrack