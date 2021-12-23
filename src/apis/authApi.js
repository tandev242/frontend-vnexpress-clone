import { axiosInstance, baseURL } from './axiosClient'

const authApi = {
  getCurrentUser: () =>
    axiosInstance.get(`${baseURL.query}/user/getCurrentUser`),
  login: () => axiosInstance.post(`${baseURL.user}/`),
}

export default authApi
