import axios from 'axios';
import { toast } from 'react-toastify';
import { APILink } from '../const/linkAPI';
import { ROUTER_URL } from '../const/router.const';
import { LOCAL_STORAGE } from '../const/local.storage.const';
import { getItemInLocalStorage } from '../utils/getItemInLocalStorage';
import { store, toggleLoading } from '../app/redux/store';
import { removeItemInLocalStorage } from '../utils/removeItemInLocalStorage';

export const axiosInstance = axios.create({
    baseURL: APILink ,
    headers: {
        'content-type': 'application/json; charset=UTF-8'
    },
    timeout: 300000,
    timeoutErrorMessage: `Connection is timeout exceeded`
});

export const getState = (store: any) => {
    return store.getState();
}


axiosInstance.interceptors.request.use(
    (config) => {
        const user: any = getItemInLocalStorage(LOCAL_STORAGE.ACCOUNT_ADMIN);
        if (config.headers === undefined) config.headers;
        if (user) config.headers['Authorization'] = `Bearer ${user.access_token}`;
        return config;
    },
    (err) => {
        return handleErrorByToast(err);
    }
);

axiosInstance.interceptors.response.use(
    (config) => {
        store.dispatch(toggleLoading(false));
        return Promise.resolve((config));
    },
    (err) => {
        const { response } = err;
        if (response && response.status === 401) {
            setTimeout(() => {
                removeItemInLocalStorage(LOCAL_STORAGE.ACCOUNT_ADMIN)
                window.location.href = ROUTER_URL.SIGN_IN;
            }, 2000);
        }
        return handleErrorByToast(err);
    }
)

const handleErrorByToast = (error: any) => {
    const message = error.response?.data?.message ? error.response?.data?.message : error.message;
    toast.error(message);
    store.dispatch(toggleLoading(false));
    return null;
}
