import request from "supertest";
import {app, RouterPath} from "../../settings";
import {resolutions} from "../../data_base/hw_1_data";

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

    it('should create course with correct data', async () => {

        const createResponse = await request(app)
            .post(RouterPath.videos)
            .send({
                title:  'title',
                author: 'author',
                availableResolutions: ['P144']
            })
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
    it('should create course_2 with correct data', async () => {

        const createResponse = await request(app)
            .post(RouterPath.videos)
            .send({
                title:  'title_2',
                author: 'author_2',
                availableResolutions: ['P144','P720']
            })
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
    it('shouldn`t сreate course with incorrect data', async () => {
        await request(app)
            .post(RouterPath.videos)
            .send({
                title:  ' 2244d ',
                author: 'author_',
                availableResolutions: ['P144','P72990']
            })
            .expect(400)
    });
    it('shouldn`t update video ', async () => {

        //const data:updateCourses = {title:''}
        await request(app)
            .put(`${RouterPath.videos}/${createdVideo.id}`)
            .send(
                {
                    title:  ' 2244d ',
                    author: 'author_hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
                    availableResolutions: ['P144','P720']
                }
            )
            .expect(400)

        await request(app)
            .get(`${RouterPath.videos}/${createdVideo.id}`)
            .expect(200, createdVideo)
    });
    it('should update unexpected course ', async () => {

        //const data:updateCourses = {title:''}
        await request(app)
            .put(`${RouterPath.videos}/${-100}`)
            .send(
                {
                    title:  ' 2244d ',
                    author: 'authorhhhhh',
                    availableResolutions: ['P144','P720']
                }
            )
            .expect(404)

    });
    it('should update course correct ', async () => {

        //const data:updateCourses = {title:'video: change'}
        await request(app)
            .put(`${RouterPath.videos}/${createdVideo.id}`)
            .send(
                {
                    title: ' 2244d ',
                    author: 'authorhhhhh',
                    availableResolutions: ['P144', 'P720'],
                    canBeDownloaded: true
                }
            )
            .expect(204)


        await request(app)
            .get(`${RouterPath.videos}/${createdVideo.id}`)
            .expect(200, {
                ...createdVideo,
                title: ' 2244d ',
                author: 'authorhhhhh',
                availableResolutions: [resolutions.P144, resolutions.P720],
                canBeDownloaded: true
            })
    });
    it('should delete course', async () => {

        await request(app)
            .delete(`${RouterPath.videos}/${createdVideo.id}`)
            .expect(204)

        await request(app)
            .get(`${RouterPath.videos}/${createdVideo.id}`)
            .expect(404)

    });
    it('shouldn`t delete unexpected course', async () => {


        await request(app)
            .delete(`${RouterPath.videos}/${-100}`)
            .expect(404)

        await request(app)
            .get(`${RouterPath.videos}/${-100}`)
            .expect(404)

    });


})