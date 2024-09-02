import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4050',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//accessToken 재발급 진행
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refreshToken');

            if (refreshToken) {
                try {
                    console.log('accessToke재발급 진행');
                    const { data } = await axios.post('/auth/refresh-token', { refreshToken: refreshToken, });  // body로 전달
                    localStorage.setItem('accessToken', data.accessToken);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
                    console.log('accessToken', data.accessToken);
                    
                    // 실패한 원래 요청을 재시도
                    return api(originalRequest);
                } catch (error) {
                    console.error('Refresh token failed', error);
                    // RefreshToken이 유효하지 않다면 사용자 로그아웃 또는 다른 조치
                }
            }
        }
        return Promise.reject(error);
    }
);

export default api;