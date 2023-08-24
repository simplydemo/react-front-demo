import axios from 'axios';

// const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;
const USER_API_BASE_URL = "/api/v1/users";

const axiosInstance = axios.create({
    baseURL: USER_API_BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
});

// 요청 인터셉터 추가하기
axiosInstance.interceptors.request.use(
    config => {
        // 요청이 전달되기 전에 작업 수행
        config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
        return config;
    },
    error => {
        // 요청 오류가 있는 작업 수행
        console.log(error);
        return Promise.reject(error);
    }
);

// 응답 인터셉터 추가하기
axiosInstance.interceptors.response.use(
    response => {
        // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
        return response;
    },
    error => {
        // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
        console.log(error);
        return Promise.reject(error);
    }
);

class UserService {

    getUsers(page, size) {
        return axios.get(USER_API_BASE_URL + '?page=' + page + '&size=' + size);
    }

    createUser(user) {
        return axios.post(USER_API_BASE_URL, user);
    }

    getUserById(id) {
        return axios.get(USER_API_BASE_URL + '/' + id);
    }

    updateUser(user, id) {
        return axios.put(USER_API_BASE_URL + '/' + id, user);
    }

    deleteUser(id) {
        return axios.delete(USER_API_BASE_URL + '/' + id);
    }
}

const userService = new UserService();
export default userService;

