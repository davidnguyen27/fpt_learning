import axios from "axios";
import { APILink } from "../const/linkAPI";
import { Blog, DataTransfer } from "../models/Blog";

export const getBlogsAPI = async (dataTransfer: DataTransfer) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Cannot get token!");

    const res = await axios.post<{ data: { pageData: Blog[] } }>(
      `${APILink}/api/blog/search`,
      dataTransfer,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
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
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Cannot get token!");

    const res = await axios.get(`${APILink}/api/blog/${blogId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Cannot get token!");

    const res = await axios.post(`${APILink}/api/blog`, blogData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Cannot get token!");

    const res = await axios.put(`${APILink}/api/blog/${blogId}`, blogData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return { ...res.data.data, _id: blogId };
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
  }
};

export const deleteBlogAPI = async (blogId: string) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Cannot get token!");

    const res = await axios.delete(`${APILink}/api/blog/${blogId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
  }
};
