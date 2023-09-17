import {Request, Response, Router} from "express";

import {db_hw_1, resolutions, ValidationErrorType, videoType} from "../data_base/hw_1_data";


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
    const resol:[] = req.body.resolutions
    const resol_fin: resolutions[] = []
    let errors: ValidationErrorType[] = [];
    if(!title || typeof title !== 'string' || title.trim().length > 40 || title.trim().length === 0){
        errors.push({message: "invalid title", field: 'title'})
    }
    if(!author || typeof author !== 'string' || author.trim().length > 20 || author.trim().length === 0){
        errors.push({message: "invalid author", field: 'author'})
    }
    for (let i = 0; i< resol.length; i++){
        if(!resol || !(resol[i] in resolutions)){
            errors.push({message: "invalid resolutions", field: 'resolutions'})
            break
        }
        else {
            if( typeof resol[i] === 'string'){
                resol_fin.push(resolutions[resol[i]])
            }
        }
    }


    if(errors.length > 0){
        res.status(400).send(errors)
    }
    else{
        const video: videoType = {
            id: +(new Date()),
            title:  req.body.title,
            author: req.body.author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(), //date.toIsoString()
            publicationDate: new Date(new Date().getDate() +1).toISOString(), // createdAt = 1 day, (put)
            availableResolutions: resol_fin
        }
        db_hw_1.videos.push(video)
        res.status(201).send(video)
    }


})
// videosRouter.put('/:id',(req: Request, res:Response) =>{
//     const course = db.courses.find(c => c.id === +req.params.id)
//     if (course)
//     {
//         const title = req.body.title
//         if(title && typeof title === "string" && title.trim().length > 0){
//             course.title = req.body.title
//             res.status(200).send(course)
//         }
//         else res.sendStatus(400)
//
//     }
//     else{
//         res.sendStatus (404)
//     }
//
// })
// videosRouter.delete('/:id', (req:Request, res:Response) => {
//     for(let i =0;i<db.courses.length;i++){
//         if (db.courses[i].id === +req.params.id){
//             db.courses.splice(i,1)
//             res.sendStatus(204)
//             break;
//         }
//     }
//     res.status(404).send('course with this id does not exist ')
//
// })