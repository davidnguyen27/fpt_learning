import { message } from "antd";
import { useState } from "react";
import { createBlogAPI } from "../../services/blogService";
import { Blog } from "../../models/Blog";

const useAddBlog = (onSuccess: () => void) => {
  const [loading, setLoading] = useState<boolean>(false);

  const createBlog = async (blogData: Blog) => {
    try {
      setLoading(true);
      await createBlogAPI(blogData);
      message.success("Blog added successfully");
      onSuccess();
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { createBlog, loading };
};

export default useAddBlog;
