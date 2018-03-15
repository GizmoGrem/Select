import axios from 'axios';
//TODO поправить после того как сделают деплой
const SERVER = process.env.SERVER || '/api';

const axiosAPI = axios.create({
	baseURL: SERVER
});

axiosAPI.interceptors.response.use(null, (error) => {
	if (error.response && error.response.status === 401) {
		window.location = '/login';
	}
	throw error;
});

axiosAPI.defaults.headers.common['Authorization']
	= `Bearer ${localStorage.getItem('token')}`;

export const updateAuthToken = (token) => {
	localStorage.setItem('token', token);
	axiosAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export default axiosAPI;
