import request from "supertest";
import {app, RouterPath} from "../../settings";
import {createCourse} from "../../models/courses/createCourse";
import {updateCourses} from "../../models/courses/updateCourses";
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
        //console.log(createdVideo)

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
        console.log(createdVideo)
        await request(app)
            .get(`${RouterPath.videos}/${createdVideo.id}`)
            .expect(200, createdVideo)
    });
    // it('should сreate course_2 with correct data', async () => {
    //
    //     const data:createCourse = {title:'video: shortcut_2'}
    //     const createResponse = await request(app)
    //         .post(RouterPath.courses)
    //         .send(data)
    //         .expect(201)
    //
    //     createdCourse_2 = createResponse.body;
    //
    //     expect(createdCourse_2).toEqual({
    //         id: expect.any(Number),
    //         title:'video: shortcut_2',
    //         student_count: expect.any(Number)
    //     })
    //
    //     await request(app)
    //         .get(RouterPath.courses)
    //         .expect(200, [createdCourse,createdCourse_2])
    // });
    // it('shouldn`t сreate course with incorrect data', async () => {
    //     await request(app)
    //         .post(RouterPath.courses)
    //         .send({title:''})
    //         .expect(400,'incorrect title')
    // });
    // it('shouldn`t update video ', async () => {
    //
    //     const data:updateCourses = {title:''}
    //     await request(app)
    //         .put(`${RouterPath.courses}/${createdCourse.id}`)
    //         .send(data)
    //         .expect(400)
    //
    //     await request(app)
    //         .get(`${RouterPath.courses}/${createdCourse.id}`)
    //         .expect(200, createdCourse)
    // });
    // it('should update unexpected course ', async () => {
    //
    //     const data:updateCourses = {title:''}
    //     await request(app)
    //         .put(`${RouterPath.courses}/${-100}`)
    //         .send(data)
    //         .expect(404)
    //
    // });
    // it('should update course correct ', async () => {
    //     //console.log(createdCourse)
    //
    //     const data:updateCourses = {title:'video: change'}
    //     await request(app)
    //         .put(`${RouterPath.courses}/${createdCourse.id}`)
    //         .send(data)
    //         .expect(200)
    //
    //     //console.log(createdCourse)
    //     await request(app)
    //         .get(`${RouterPath.courses}/${createdCourse.id}`)
    //         .expect(200, {
    //             ...createdCourse,
    //             title:'video: change',
    //
    //         })
    // });
    // it('should delete course', async () => {
    //
    //     await request(app)
    //         .delete(`${RouterPath.courses}/${createdCourse.id}`)
    //         .expect(204)
    //
    //     await request(app)
    //         .get(`${RouterPath.courses}/${createdCourse.id}`)
    //         .expect(404)
    //
    // });
    // it('shouldn`t delete unexpected course', async () => {
    //
    //     const data:updateCourses = {title:''}
    //     await request(app)
    //         .delete(`${RouterPath.courses}/${-100}`)
    //         .expect(404)
    //
    //     await request(app)
    //         .get(`${RouterPath.courses}/${-100}`)
    //         .expect(404)
    //
    // });


})