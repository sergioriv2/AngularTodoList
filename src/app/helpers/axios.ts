import axios from 'axios';
import { LocalStorageItemsEnum } from '../common/enums/local-storage.enum';
import { environment } from '../../environments/environment';

const CustomAxios = axios.create({
    baseURL: environment.apiUrl,
});

CustomAxios.interceptors.request.use((config) => {
    config.headers['Authorization'] = localStorage?.getItem(
        LocalStorageItemsEnum.ACCESS_TOKEN,
    );

    return config;
});

export const CustomAxiosInstance = CustomAxios;
