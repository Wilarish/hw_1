import {Request, Response, Router} from "express";

import {db_hw_1, Errors, resolutions, ValidationErrorType, videoType} from "../data_base/hw_1_data";


export const videosRouter = Router()

videosRouter.get('/', (req:Request, res:Response) => {
    res.send(db_hw_1.videos)
})
videosRouter.get('/:id', (req:Request, res:Response) => {
    for (let i=0; i< db_hw_1.videos.length; i++){
        if(db_hw_1.videos[i].id === +req.params.id){
            res.send(db_hw_1.videos[i])
            break;
        }
    }
    res.sendStatus(404)
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
        errors.push({message: "invalid title", field: 'title'})
    }
    if(!author || typeof author !== 'string' || author.trim().length > 20 || author.trim().length === 0){
        errors.push({message: "invalid author", field: 'author'})
    }
    if(resolutions_q){
        for(let i = 0; i < resolutions_q.length; i++){
            if(!Object.values(resolutions)?.includes(resolutions_q[i])){
                errors.push({message: "invalid resolutions", field: 'resolutions'})
                break
            }

        }
    }else errors.push({message: "unexpected resolutions", field: 'resolutions'})

    const Errors: Errors = {
        errorsMessages: errors
    }
    if(errors.length > 0){
        res.status(400).send(Errors)
    }
    else{
        const date = new Date()
        const video: videoType = {
            id: +(new Date()),
            title: title,
            author: author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: date.toISOString(),
            publicationDate: new Date(date.setDate(date.getDate() +1)).toISOString(), // createdAt = 1 day, (put)
            availableResolutions: resolutions_q
        }
        db_hw_1.videos.push(video)
        res.status(201).send(video)
    }


})
videosRouter.put('/:id',(req: Request, res:Response) =>{

    const title = req.body.title
    const author = req.body.author
    const resolutions_q = req.body.availableResolutions
    const errors: ValidationErrorType[] = [];
    const video = db_hw_1.videos.find(c => c.id === +req.params.id)
    if (video)
    {
        if(!title || typeof title !== 'string' || title.trim().length > 40 || title.trim().length === 0){
            errors.push({message: "invalid title", field: 'title'})
        }
        if(!author || typeof author !== 'string' || author.trim().length > 20 || author.trim().length === 0){
            errors.push({message: "invalid author", field: 'author'})
        }
        if(resolutions_q){
            for(let i = 0; i < resolutions_q.length; i++){
                if(!Object.values(resolutions)?.includes(resolutions_q[i])){
                    errors.push({message: "invalid resolutions", field: 'resolutions'})
                    break
                }

            }
        }else errors.push({message: "unexpected resolutions", field: 'resolutions'})

        const Errors: Errors = {
            errorsMessages: errors
        }
        if(errors.length > 0){
            res.status(400).send(Errors)
        }
        else {
            video.title = title
            video.author = author
            video.availableResolutions = resolutions_q
            res.status(204).send(video)
        }

    }
    else{
        res.sendStatus (404)
    }

})
videosRouter.delete('/:id', (req:Request, res:Response) => {
    for(let i =0;i<db_hw_1.videos.length;i++){
        if (db_hw_1.videos[i].id === +req.params.id){
            db_hw_1.videos.splice(i,1)
            res.sendStatus(204)
            break;
        }
    }
    res.status(404).send('course with this id does not exist ')

})