import { useState } from "react";
import { message } from "antd";
import { Blog } from "../../models/Blog";
import { updateBlogAPI } from "../../services/blogService";

const useUpdateBlog = (onSuccess: () => void) => {
  const [loading, setLoading] = useState<boolean>(false);

  const updateBlog = async (blogId: string, blogData: Blog) => {
    try {
      setLoading(true);
      await updateBlogAPI(blogId, blogData);
      message.success("Blog updated successfully");
      onSuccess();
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { updateBlog, loading };
};

export default useUpdateBlog;
