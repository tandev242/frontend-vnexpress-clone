import { axiosInstance, baseURL } from "./axiosClient";


const commentApi = {
    addTopicComment: (data) => axiosInstance.post(`${baseURL.comment}/topicComment/addTopicComment`, data),
    addSubTopicComment: (data) => axiosInstance.post(`${baseURL.comment}/topicComment/addSubTopicComment`, data),

    addPostComment: (data) => axiosInstance.post(`${baseURL.comment}/postComment/addPostComment`, data),
    addSubPostComment: (data) => axiosInstance.post(`${baseURL.comment}/postComment/addSubPostComment`, data),
};

export default commentApi;

