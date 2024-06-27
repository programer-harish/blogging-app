import { privateApiCaller, apiCaller } from "./helper";

export const createPost = (postData) => {
    let post = {
        title: postData.title,
        content: postData.content
    }
    return privateApiCaller.post(`post/create/category/${postData.category}/user/${postData.userId}`, post)
        .then((response) => response)
}

export const getAllPostByPage = (pageNo = 0, pageSize = 5, sortBy = 'addDate', sortDir = 'desc') => {
    return apiCaller.get(`post/getAll?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`)
        .then(response => response)
}
export const getAllPost = () => {
    return apiCaller.get(`post/getAll`)
        .then(response => response)
}

export const loadPost = (postId) => {
    return apiCaller.get(`post/getPost/${postId}`).then(response => response)
}

export const uploadPostImage = (image, postId) => {
    let formData = new FormData();
    formData.append("image", image);

    return privateApiCaller.post(`/post/image/upload/${postId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => response);
}

export const getPostsByCategory = (category) => {
    return apiCaller.get(`post/category/${category}`, category).then(response => response)
}
export const getPostsOfUser = (userId) => {
    return apiCaller.get(`post/user/${userId}`).then(response => response)
}
export const deleteUserPost = (postId) => {
    return privateApiCaller.delete(`post/delete/${postId}`).then(response => response)
}
export const updatePost = (postData,postId,userId) => {
    let category = {categoryId:postData.category}
    let user = {id:userId}
    let post = {
        title: postData.title,
        content: postData.content,
        category: category,
        user: user
    }
    return privateApiCaller.put(`post/update/${postId}`, post)
        .then((response) => response)
}