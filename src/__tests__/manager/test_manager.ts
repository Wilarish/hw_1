import request from "supertest";
import {app, RouterPath} from "../../settings";
import {createVideos} from "../../models/videos/createVideo";
import {HTTP_statuses, HTTPStatusType} from "../../data_base/HTTP_statuses";
import {resolutions} from "../../data_base/hw_1_data";


export const createUserManagerOptions= {

}

export const test_manager ={

    async createUser( data: createVideos, expectedStatusCode: HTTPStatusType = HTTP_statuses.CREATED_201 ) {

        const response = await request(app)
            .post(RouterPath.videos)
            .send(data)
            .expect(expectedStatusCode)

        const created_Video_Manager = response.body

        if (expectedStatusCode === HTTP_statuses.OK_200){



            expect(created_Video_Manager).toEqual({
                id: created_Video_Manager.id,
                title:  data.title,
                author: data.author,
                canBeDownloaded: false,
                minAgeRestriction: null,
                createdAt: expect.any(String), //date.toIsoString()
                publicationDate: expect.any(String), // createdAt = 1 day, (put)
                availableResolutions: data.availableResolutions
            })
        }


        return {response, created_Video_Manager};
    }
}