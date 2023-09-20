import request from "supertest";
import {app, RouterPath} from "../../settings";
import {createVideos} from "../../models/videos/createVideo";
import {updateVideo} from "../../models/videos/updateVideo";
import {video_test_manager} from "../manager/video_test_manager";
import {HTTP_statuses} from "../../data_base/HTTP_statuses";
import {videoType} from "../../models/videos/mainVideoType";

describe('/videos', ()=>{
    beforeAll(async ()=>{
        await request(app).delete('/testing/all-data')
    })


    it('should return 200 and empty array', async () => {
        await request(app)
            .get(RouterPath.videos)
            .expect(HTTP_statuses.OK_200, [])
    })

    let createdVideo: videoType;
    let createdVideo_2: videoType;

    it('should create video with correct data', async () => {

        const data: createVideos = {
            title:  'title',
            author: 'author',
            availableResolutions: ['P144']
        }
        // Don`t understand this one
        const {created_Video_Manager} = await video_test_manager.createUser(data)

        createdVideo = created_Video_Manager;


        await request(app)
            .get(`${RouterPath.videos}/${createdVideo.id}`)
            .expect(HTTP_statuses.OK_200, createdVideo)

    });
    it('should create video_2 with correct data', async () => {

        const data: createVideos = {
            title:  'title_2',
            author: 'author_2',
            availableResolutions: ['P144','P720']
        }
        // Don`t understand this one
        const {created_Video_Manager} = await video_test_manager.createUser(data)

        createdVideo_2 = created_Video_Manager;


        await request(app)
            .get(RouterPath.videos)
            .expect(HTTP_statuses.OK_200, [createdVideo, createdVideo_2])
    });
    it('shouldn`t сreate video with incorrect data', async () => {

        const data: createVideos = {
            title:  ' 2244d ',
            author: 'author_',
            availableResolutions: ['P144','P72990']
        }

        await video_test_manager.createUser(data, HTTP_statuses.BAD_REQUEST_400)
    });
    it('shouldn`t update video ', async () => {

        const data:updateVideo = {
            title: ' 2244d ',
            author: 'author',
            availableResolutions: ['P144', 'P240'],
            canBeDownloaded: true,
            publicationDate: "2023-09-21T09:55:46.372Z",
            minAgeRestriction: 16
        }

       const longTitle = await request(app)
            .put(`${RouterPath.videos}/${createdVideo.id}`)
            .send({...data, title: 'hjfsbkfhjbwehfbjksdhbfjhdsbfjkhsdbkfjhsdbkfjhsdbfjsiobnononougbobuoibhiudhb'})
            .expect(HTTP_statuses.BAD_REQUEST_400 )

        expect(longTitle.body).toEqual({
            errorsMessages: [
                {
                    message: expect.any(String),
                    field: 'title'
                }
            ]
        })

        const nullAuthor =  await request(app)
            .put(`${RouterPath.videos}/${createdVideo.id}`)
            .send({...data, author: null})
            .expect(HTTP_statuses.BAD_REQUEST_400)

        expect(nullAuthor.body).toEqual({
            errorsMessages: [
                {
                    message: expect.any(String),
                    field: 'author'
                }
            ]
        })

        const incorrect_resolution = await request(app)
            .put(`${RouterPath.videos}/${createdVideo.id}`)
            .send({...data, availableResolutions: ['P144', 'P240888']})
            .expect(HTTP_statuses.BAD_REQUEST_400)

        expect(incorrect_resolution.body).toEqual({
            errorsMessages: [
                {
                    message: expect.any(String),
                    field: 'availableResolutions'
                }
            ]
        })

        const notBoolCanBeLoaded = await request(app)
            .put(`${RouterPath.videos}/${createdVideo.id}`)
            .send({...data, canBeDownloaded: 100})
            .expect(HTTP_statuses.BAD_REQUEST_400)

        expect(notBoolCanBeLoaded.body).toEqual({
            errorsMessages: [
                {
                    message: expect.any(String),
                    field: 'canBeDownloaded'
                }
            ]
        })

        const NotStringPublicDate = await request(app)
            .put(`${RouterPath.videos}/${createdVideo.id}`)
            .send({...data, publicationDate: 2023})
            .expect(HTTP_statuses.BAD_REQUEST_400)

        expect(NotStringPublicDate.body).toEqual({
            errorsMessages: [
                {
                    message: expect.any(String),
                    field: 'publicationDate'
                }
            ]
        })

        const NotNumberMinAge = await request(app)
            .put(`${RouterPath.videos}/${createdVideo.id}`)
            .send({...data, minAgeRestriction: "122"})
            .expect(HTTP_statuses.BAD_REQUEST_400)

        expect(NotNumberMinAge.body).toEqual({
            errorsMessages: [
                {
                    message: expect.any(String),
                    field: 'minAgeRestriction'
                }
            ]
        })

        await request(app)
            .get(`${RouterPath.videos}/${createdVideo.id}`)
            .expect(HTTP_statuses.OK_200, createdVideo)
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
            .expect(HTTP_statuses.NOT_FOUND_404)

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
        const res = await request(app)
            .put(`${RouterPath.videos}/${createdVideo.id}`)
            .send(data)
            .expect(HTTP_statuses.NO_CONTENT_204)

        console.log('RESULT:',res.body)

       const result =  await request(app)
            .get(`${RouterPath.videos}/${createdVideo.id}`)
            .expect(HTTP_statuses.OK_200 )

        expect(result.body).toEqual({
            ...createdVideo,
            ...data
        })
    });
    it('should delete video', async () => {

        await request(app)
            .delete(`${RouterPath.videos}/${createdVideo.id}`)
            .expect(HTTP_statuses.NO_CONTENT_204)

        await request(app)
            .get(`${RouterPath.videos}/${createdVideo.id}`)
            .expect(HTTP_statuses.NOT_FOUND_404)

    });
    it('shouldn`t delete unexpected video', async () => {


        await request(app)
            .delete(`${RouterPath.videos}/${-100}`)
            .expect(HTTP_statuses.NOT_FOUND_404)

        await request(app)
            .get(`${RouterPath.videos}/${-100}`)
            .expect(HTTP_statuses.NOT_FOUND_404)

    });


})