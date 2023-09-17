import request from 'supertest';
import {app, RouterPath} from "../../settings";
import {createCourse} from "../../models/courses/createCourse";
import {updateCourses} from "../../models/courses/updateCourses";
import any = jasmine.any;

describe('/courses', ()=>{
    beforeAll(async ()=>{
        await request(app).delete('/testing/all-data')
    })


    it('should return 200 and empty array', async () => {
        await request(app)
            .get(RouterPath.courses)
            .expect(200, [])
    })

    let createdCourse: any = null
    let createdCourse_2: any = null

    it('should create course with correct data', async () => {

        const data:createCourse = {title:'video: shortcut'}
        const createResponse = await request(app)
            .post(RouterPath.courses)
            .send(data)
            .expect(201)

        createdCourse = createResponse.body;

        expect(createdCourse).toEqual({
            id: expect.any(Number),
            title:'video: shortcut',
            student_count: expect.any(Number)
        })

        await request(app)
            .get(RouterPath.courses)
            .expect(200, [createdCourse])
    });
    it('should сreate course_2 with correct data', async () => {

        const data:createCourse = {title:'video: shortcut_2'}
        const createResponse = await request(app)
            .post(RouterPath.courses)
            .send(data)
            .expect(201)

        createdCourse_2 = createResponse.body;

        expect(createdCourse_2).toEqual({
            id: expect.any(Number),
            title:'video: shortcut_2',
            student_count: expect.any(Number)
        })

        await request(app)
            .get(RouterPath.courses)
            .expect(200, [createdCourse,createdCourse_2])
    });
    it('shouldn`t сreate course with incorrect data', async () => {
        await request(app)
            .post(RouterPath.courses)
            .send({title:''})
            .expect(400,'incorrect title')
    });
    it('shouldn`t update video ', async () => {

        const data:updateCourses = {title:''}
        await request(app)
            .put(`${RouterPath.courses}/${createdCourse.id}`)
            .send(data)
            .expect(400)

        await request(app)
            .get(`${RouterPath.courses}/${createdCourse.id}`)
            .expect(200, createdCourse)
    });
    it('should update unexpected course ', async () => {

        const data:updateCourses = {title:''}
        await request(app)
            .put(`${RouterPath.courses}/${-100}`)
            .send(data)
            .expect(404)

    });
    it('should update course correct ', async () => {
        //console.log(createdCourse)

        const data:updateCourses = {title:'video: change'}
        await request(app)
            .put(`${RouterPath.courses}/${createdCourse.id}`)
            .send(data)
            .expect(200)

        //console.log(createdCourse)
        await request(app)
            .get(`${RouterPath.courses}/${createdCourse.id}`)
            .expect(200, {
                ...createdCourse,
                title:'video: change',

            })
    });
    it('should delete course', async () => {

        await request(app)
            .delete(`${RouterPath.courses}/${createdCourse.id}`)
            .expect(204)

        await request(app)
            .get(`${RouterPath.courses}/${createdCourse.id}`)
            .expect(404)

    });
    it('shouldn`t delete unexpected course', async () => {

        const data:updateCourses = {title:''}
        await request(app)
            .delete(`${RouterPath.courses}/${-100}`)
            .expect(404)

        await request(app)
            .get(`${RouterPath.courses}/${-100}`)
            .expect(404)

    });


})