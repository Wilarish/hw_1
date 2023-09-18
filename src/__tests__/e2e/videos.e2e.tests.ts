import request from "supertest";
import {app, RouterPath} from "../../settings";
import {resolutions} from "../../data_base/hw_1_data";
import {createVideos} from "../../models/videos/createVideo";
import {updateVideo} from "../../models/videos/updateVideo";

describe('/videos', ()=>{
    beforeAll(async ()=>{
        await request(app).delete('/testing/all-data')
    })


    it('should return 200 and empty array', async () => {
        await request(app)
            .get(RouterPath.videos)
            .expect(200, [])
    })

    let createdVideo: any = null
    let createdVideo_2: any = null

    it('should create video with correct data', async () => {

        const data: createVideos = {
            title:  'title',
            author: 'author',
            availableResolutions: ['P144']
        }
        const createResponse = await request(app)
            .post(RouterPath.videos)
            .send(data)
            .expect(201)

        createdVideo = createResponse.body;


        expect(createdVideo).toEqual({
            id: createdVideo.id,
            title:  'title',
            author: 'author',
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: expect.any(String), //date.toIsoString()
            publicationDate: expect.any(String), // createdAt = 1 day, (put)
            availableResolutions: [resolutions.P144]
        })

        await request(app)
            .get(`${RouterPath.videos}/${createdVideo.id}`)
            .expect(200, createdVideo)

    });
    it('should create video_2 with correct data', async () => {

        const data: createVideos = {
            title:  'title_2',
            author: 'author_2',
            availableResolutions: ['P144','P720']
        }
        const createResponse = await request(app)
            .post(RouterPath.videos)
            .send(data)
            .expect(201)

        createdVideo_2 = createResponse.body;

        expect(createdVideo_2).toEqual({
            id: createdVideo_2.id,
            title:  'title_2',
            author: 'author_2',
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: expect.any(String), //date.toIsoString()
            publicationDate: expect.any(String), // createdAt = 1 day, (put)
            availableResolutions: [resolutions.P144, resolutions.P720]
        })

        await request(app)
            .get(RouterPath.videos)
            .expect(200, [createdVideo, createdVideo_2])
    });
    it('shouldn`t сreate video with incorrect data', async () => {

        const data: createVideos = {
            title:  ' 2244d ',
            author: 'author_',
            availableResolutions: ['P144','P72990']
        }

        await request(app)
            .post(RouterPath.videos)
            .send(data)
            .expect(400)
    });
    it('shouldn`t update video ', async () => {

        const data:updateVideo = {
            title: ' 2244d ',
            author: 'author',
            availableResolutions: ['P144', 'P146664'],
            canBeDownloaded: true,
            publicationDate: "2023-09-21T09:55:46.372Z",
            minAgeRestriction: 16
        }

        await request(app)
            .put(`${RouterPath.videos}/${createdVideo.id}`)
            .send(data)
            .expect(400)

        await request(app)
            .get(`${RouterPath.videos}/${createdVideo.id}`)
            .expect(200, createdVideo)
    });
    it('should update unexpected video ', async () => {

        const data:updateVideo = {
            title: ' 2244d ',
            author: 'authorhh',
            availableResolutions: ['P144', 'P720'],
            canBeDownloaded: true,
            publicationDate: "2023-09-21T09:55:46.372Z",
            minAgeRestriction: 16
        }

        await request(app)
            .put(`${RouterPath.videos}/${-100}`)
            .send(data)
            .expect(404)

    });
    it('should update video correct ', async () => {

        const data:updateVideo = {
            title: ' 2244d ',
            author: 'authorhhhhh',
            availableResolutions: ['P144', 'P720'],
            canBeDownloaded: true,
            publicationDate: "2023-09-21T09:55:46.372Z",
            minAgeRestriction: 16
        }
        const date: string = new Date().toISOString()
        await request(app)
            .put(`${RouterPath.videos}/${createdVideo.id}`)
            .send(data)
            .expect(204)


       const result =  await request(app)
            .get(`${RouterPath.videos}/${createdVideo.id}`)
            .expect(200 )

        expect(result.body).toEqual({
            ...createdVideo,
            ...data
        })
    });
    it('should delete video', async () => {

        await request(app)
            .delete(`${RouterPath.videos}/${createdVideo.id}`)
            .expect(204)

        await request(app)
            .get(`${RouterPath.videos}/${createdVideo.id}`)
            .expect(404)

    });
    it('shouldn`t delete unexpected video', async () => {


        await request(app)
            .delete(`${RouterPath.videos}/${-100}`)
            .expect(404)

        await request(app)
            .get(`${RouterPath.videos}/${-100}`)
            .expect(404)

    });


})