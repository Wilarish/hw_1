import express, {Request, Response} from "express";

import {coursesRouter} from "./rotes/courses-router";
import {db} from "./data_base/data";
import {db_hw_1} from "./data_base/hw_1_data";
import {videosRouter} from "./rotes/videos-router";

export const app = express()

app.use(express.json())

export const RouterPath = {
    courses: '/courses',
    videos: '/videos'
}

app.use(RouterPath.courses, coursesRouter)
app.use(RouterPath.videos, videosRouter)



app.get('/', (req:Request, res:Response) => {
    res.send('Hello World!)***(')
})
app.delete('/testing/all-data',(req:Request, res:Response)=>{
    db.courses = []
    db_hw_1.videos = []
    res.sendStatus(204)

})