
export interface ApiRequestModel<T = any> {
    isLoading: boolean;
    payload: T;
    headers: {
        [key: string]: string | number;
    };
    isCache: boolean;
    url: string;
}
