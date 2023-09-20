import e, {Request, Response, Router} from "express";

import { Errors, resolutions, ValidationErrorType} from "../data_base/hw_1_data";
import {errorMessage} from "../data_base/errorMessages";
import {DB_videos, videoRepository} from "../repositories/video-repository";
import {videoType} from "../models/videos/mainVideoType";
import {HTTP_statuses} from "../data_base/HTTP_statuses";



export const videosRouter = Router()

videosRouter.get('/', (req:Request, res:Response) => {
    res.send(DB_videos.videos)
})
videosRouter.get('/:id', (req:Request<{id: string}>, res:Response) => {

    const foundVideo = videoRepository.findVideo(req.params.id)

    if(!foundVideo)
        res.sendStatus(HTTP_statuses.NOT_FOUND_404)

    else {
        res.send(foundVideo)
    }
})
// videosRouter.get('/', (req:Request, res:Response) => {
//     if(req.query.id){
//         const search = req.query.id.toString
//         for(let i = 0;i< db.courses.length;i++){
//             if(db.courses[i].id === +search){
//                 res.status(200).send(db.courses[i])
//                 break;
//             }
//         }
//         res.sendStatus(404)
//
//     }
// })
videosRouter.post('/', (req:Request, res:Response) => {
    const title = req.body.title
    const author = req.body.author
    const resolutions_q = req.body.availableResolutions
    const errors: ValidationErrorType[] = [];

    if(!title || typeof title !== 'string' || title.trim().length > 40 || title.trim().length === 0){
        errors.push({message: errorMessage.title, field: 'title'})
    }

    if(!author || typeof author !== 'string' || author.trim().length > 20 || author.trim().length === 0){
        errors.push({message: errorMessage.author, field: 'author'})
    }

    if(resolutions_q){
        for(let i = 0; i < resolutions_q.length; i++){
            if(!Object.values(resolutions)?.includes(resolutions_q[i])){
                errors.push({message: errorMessage.availableResolutions, field: 'availableResolutions'})
                break
            }

        }
    }else errors.push({message: errorMessage.availableResolutions, field: 'availableResolutions'})

    const Errors: Errors = {
        errorsMessages: errors
    }
    if(errors.length > 0){
        res.status(HTTP_statuses.BAD_REQUEST_400).send(Errors)
    }
    else{
        const video = videoRepository.createVideo({
            title: title,
            author: author,
            availableResolutions:  resolutions_q
        })
        DB_videos.videos.push(video)
        res.status(HTTP_statuses.CREATED_201).send(video)
    }


})
videosRouter.put('/:id',(req: Request<{id: string}, {}, {publicationDate: string, minAgeRestriction: number, canBeDownloaded: boolean, title: string, author:string, availableResolutions:resolutions[] }>, res:Response) =>{

    const pubicDate:string = req.body.publicationDate
    const minAge:number = req.body.minAgeRestriction
    const canBeDownloaded:boolean = req.body.canBeDownloaded
    const title:string = req.body.title
    const author:string = req.body.author
    const resolutions_q = req.body.availableResolutions

    const errors: ValidationErrorType[] = [];

    const video: videoType | undefined = DB_videos.videos.find(c => c.id === +req.params.id)

    if (video)
    {

        if(!title || typeof title !== 'string' || title.trim().length > 40 || title.trim().length === 0){
            errors.push({message: errorMessage.title, field: 'title'})
        }

        if(!author || typeof author !== 'string' || author.trim().length > 20 || author.trim().length === 0){
            errors.push({message: errorMessage.author, field: 'author'})
        }

        if(typeof canBeDownloaded !== 'boolean'){
            errors.push({message: errorMessage.canBeDownloaded, field: 'canBeDownloaded'})
        }

        if(typeof minAge !== 'number' || minAge > 18 || minAge < 0){
            errors.push({message: errorMessage.ageRestriction, field: 'minAgeRestriction'})
        }

        const date = new Date(pubicDate)
        if(!date.getDate() || typeof pubicDate !== 'string'){
            errors.push({message: errorMessage.publicationDate, field: 'publicationDate'})
        }

        if(resolutions_q) {

            for(let i = 0; i < resolutions_q.length; i++){
                if(!Object.values(resolutions)?.includes(resolutions_q[i])){
                    errors.push({message: errorMessage.availableResolutions, field: 'availableResolutions'})
                    break
                }

            }
        }
        else errors.push({message: "unexpected resolutions", field: 'availableResolutions'})

        const Errors: Errors = {
            errorsMessages: errors
        }
        if(errors.length > 0){
            res.status(HTTP_statuses.BAD_REQUEST_400).send(Errors)
        }
        else {
            video.title = title
            video.author = author
            video.availableResolutions = resolutions_q
            video.canBeDownloaded = canBeDownloaded
            video.publicationDate = pubicDate
            video.minAgeRestriction = minAge

            res.status(HTTP_statuses.NO_CONTENT_204).send(video)
        }

    }
    else{
        res.sendStatus (HTTP_statuses.NOT_FOUND_404)
    }

})
videosRouter.delete('/:id', (req:Request, res:Response) => {
    for(let i =0;i<DB_videos.videos.length;i++){

        if (DB_videos.videos[i].id === +req.params.id){
            DB_videos.videos.splice(i,1)
            res.sendStatus(HTTP_statuses.NO_CONTENT_204)
            break;
        }
    }
    res.status(HTTP_statuses.NOT_FOUND_404).send('course with this id does not exist ')

})