import axios from './requestConfig';

export default {
    reg: (params) => axios.post('users/reg', params),
    login: (params) => axios.post('users/login', params),
    filmList: (params) => axios.post('film/list', params),
    detail: (params) => axios.get('film/list/detail', { params }),
}