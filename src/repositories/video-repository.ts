import {resolutions} from "../data_base/hw_1_data";
import {videoType} from "../models/videos/mainVideoType";
import {Request, Response} from "express";
import {HTTP_statuses} from "../data_base/HTTP_statuses";
import {videosRouter} from "../rotes/videos-router";
import {createVideos} from "../models/videos/createVideo";
import {errorMessage} from "../data_base/errorMessages";

export type Data_base_videos = {
    videos: videoType[]
}

export const DB_videos: Data_base_videos = {
    videos: [{
        id: 1,
        title: 'first', // post + put -> 40 symbol max
        author: 'simple code', // post + put -> 20 symbol max
        canBeDownloaded: false, // (post -> def value = false) => put
        minAgeRestriction: null, // (post -> def value = null) => put
        createdAt: new Date().toISOString(), //date.toIsoString()
        publicationDate: new Date(new Date().getDate() +1).toISOString(), // createdAt = 1 day, (put)
        availableResolutions: [resolutions['P144'], resolutions.P360, resolutions.P480, resolutions.P720]
    }

    ]
}
export const  videoRepository = {
    findVideo(id: string ){
        let founded_video = null
        for (let i=0; i< DB_videos.videos.length; i++){
            if(DB_videos.videos[i].id === +id){
                founded_video = (DB_videos.videos[i])

                break;
            }
        }
        return founded_video
    },
    createVideo(data: createVideos ){

        const resolutions: any = data.availableResolutions

        const date = new Date()
        const video: videoType = {
            id: +(new Date()),
            title: data.title,
            author: data.author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: date.toISOString(),
            publicationDate: new Date(date.setDate(date.getDate() +1)).toISOString(), // createdAt = 1 day, (put)
            availableResolutions: resolutions
        }
        return video
    }
}