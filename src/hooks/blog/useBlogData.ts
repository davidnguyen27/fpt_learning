import { useEffect, useState } from "react";
import { Blog, DataTransfer } from "../../models/Blog";
import { getBlogsAPI } from "../../services/blogService";

const useBlogsData = (dataTransfer: DataTransfer) => {
  const [data, setData] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const fetchedData = await getBlogsAPI(dataTransfer);
      setData(fetchedData);
      setError(null);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [dataTransfer]);

  return { data, loading, error, refetchData: fetchBlogs };
};

export default useBlogsData;
