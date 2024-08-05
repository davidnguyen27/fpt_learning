import { DataTransfer, DataResponse } from "../models/CourseLog";
import { axiosInstance } from "./axiosInstance";

export const getCourseLogsAPI = async (
    dataTransfer: DataTransfer,
): Promise<DataResponse['data']> => {  // Return the correct data type
    try {
        const response = await axiosInstance.post<DataResponse>(
            "/api/course/log/search",
            dataTransfer,
        );
        return response.data.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}
