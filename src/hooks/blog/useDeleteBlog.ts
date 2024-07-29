import { useState } from "react";
import { message } from "antd";
import { deleteBlogAPI } from "../../services/blogService";

const useDeleteBlog = (onSuccess: () => void) => {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteBlog = async (blogId: string) => {
    try {
      setLoading(true);
      await deleteBlogAPI(blogId);
      message.success("Blog deleted successfully");
      onSuccess();
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { deleteBlog, loading };
};

export default useDeleteBlog;
