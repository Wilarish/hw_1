export enum resolutions{
    P144 = "P144",
    P240 = "P240",
    P360 = "P360",
    P480 = "P480",
    P720 = "P720",
    P1080 = "P1080",
    P1440 = "P1440",
    P2160 = "P2160"
}

export type videoType = {
    id: number,
    title: string, // post + put -> 40 symbol max
    author: string, // post + put -> 20 symbol max
    canBeDownloaded: boolean, // (post -> def value = false) => put
    minAgeRestriction: number | null, // (post -> def value = null) => put
    createdAt: string, //date.toIsoString()
    publicationDate: string, // createdAt = 1 day, (put)
    availableResolutions: resolutions[] // post + put

}

export type ValidationErrorType = {
    message: string,
    field: string
}
export type Errors = {
    errorsMessages: ValidationErrorType[]
}

//post 400 + {errorsMessages: ValidationErrorType[]} || 201 + video 🟨 ✅
//put  404 || 400 {errorsMessages: ValidationErrorType[]} || 204
//delete 404 || 204 ✅
//get all => 200 + videos ✅
//get byId 404 || 200 + video ✅
//testingAllData => 204 and clear videos array ✅

export type DbType_HW_1 = {
    videos: videoType[]
}

export const db_hw_1: DbType_HW_1 = {
    videos: [{
        id: 1,
        title: 'first', // post + put -> 40 symbol max
        author: 'simple code', // post + put -> 20 symbol max
        canBeDownloaded: false, // (post -> def value = false) => put
        minAgeRestriction: null, // (post -> def value = null) => put
        createdAt: new Date().toISOString(), //date.toIsoString()
        publicationDate: new Date(new Date().getDate() +1).toISOString(), // createdAt = 1 day, (put)
        availableResolutions: [resolutions['P144'], resolutions.P360, resolutions.P480, resolutions.P720]
    }

    ]
}