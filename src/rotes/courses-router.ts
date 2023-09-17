import {Request, Response, Router} from "express";
import {CourseType, db} from "../data_base/data";
import * as crypto from "crypto";
import {db_hw_1} from "../data_base/hw_1_data";

export const coursesRouter = Router()

coursesRouter.get('/', (req:Request, res:Response) => {
    res.send(db.courses)
})
coursesRouter.get('/:id', (req:Request, res:Response) => {
    for (let i=0; i< db_hw_1.videos.length; i++){
        if(db_hw_1.videos[i].id === +req.params.id){
            res.sendStatus(200).send(db_hw_1.videos[i])
            break;
        }
    }
    res.sendStatus(404)
})

// coursesRouter.get('/', (req:Request, res:Response) => {
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

coursesRouter.post('/', (req:Request, res:Response) => {
    const title = req.body.title
    if(title && typeof title === 'string' && title.trim().length > 0){
        const new_course:CourseType = {
            id: db.courses.length+1,
            title: title,
            student_count: +(new Date())
        }
        db.courses.push(new_course)
        res.status(201).send(new_course)
    }else res.status(400).send('incorrect title')

})

coursesRouter.put('/:id',(req: Request, res:Response) =>{
    const course = db.courses.find(c => c.id === +req.params.id)
    if (course)
    {
        const title = req.body.title
        if(title && typeof title === "string" && title.trim().length > 0){
            course.title = req.body.title
            res.status(200).send(course)
        }
        else res.sendStatus(400)

    }
    else{
        res.sendStatus (404)
    }

})

coursesRouter.delete('/:id', (req:Request, res:Response) => {
    for(let i =0;i<db.courses.length;i++){
        if (db.courses[i].id === +req.params.id){
            db.courses.splice(i,1)
            res.sendStatus(204)
            break;
        }
    }
    res.status(404).send('course with this id does not exist ')

})