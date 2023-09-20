import express, {Request, Response} from "express";

import {coursesRouter} from "./rotes/courses-router";
import {db} from "./data_base/data";
import {videosRouter} from "./rotes/videos-router";
import {DB_videos} from "./repositories/video-repository";

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
    DB_videos.videos = []
    res.sendStatus(204)

})