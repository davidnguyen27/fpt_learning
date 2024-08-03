import { APILink } from "../const/linkAPI";
import { Blog, DataTransfer } from "../models/Blog";
import { axiosInstance } from "./axiosInstance";

export const getBlogsAPI = async (dataTransfer: DataTransfer) => {
  try {
    const res = await axiosInstance.post<{ data: { pageData: Blog[] } }>(
      `${APILink}/api/blog/search`,
      dataTransfer);
    if (res.data && res.data.data) {
      return res.data.data.pageData;
    }
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      return error.response.data.message;
    }
  }
};

export const getBlogAPI = async (blogId: string) => {
  try {
    const res = await axiosInstance.get(`${APILink}/api/blog/${blogId}`);
    const blogData: Blog = res.data.data;
    if (!blogData) throw new Error("Not found category");
    return blogData;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
  }
};

export const createBlogAPI = async (blogData: Partial<Blog>) => {
  try {
    const res = await axiosInstance.post(`${APILink}/api/blog`, blogData);
    return res.data.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
  }
};

export const updateBlogAPI = async (
  blogId: string,
  blogData: Partial<Blog>,
) => {
  try {
    const res = await axiosInstance.put(`${APILink}/api/blog/${blogId}`, blogData);
    return { ...res.data.data, _id: blogId };
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
  }
};

export const deleteBlogAPI = async (blogId: string) => {
  try {
    const res = await axiosInstance.delete(`${APILink}/api/blog/${blogId}`);
    return res.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
  }
};
