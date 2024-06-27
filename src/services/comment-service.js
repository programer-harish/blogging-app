import { privateApiCaller } from "./helper";

export const createComment=(comment,postId)=> {
    return privateApiCaller.post(`comment/post/${postId}/create`,comment).then(response=>response)
}