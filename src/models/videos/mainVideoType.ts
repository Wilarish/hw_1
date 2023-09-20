import {resolutions} from "../../data_base/hw_1_data";

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