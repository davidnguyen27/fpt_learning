import { useEffect, useState } from "react";
import { getCategoriesAPI } from "../../services/categoryService";
import { DataTransfer } from "../../models/Category";

interface DataType {
    key: string;
    name: string;
    created_at: string;
  updated_at: string;

}

const useCategoriesData = (dataTransfer: DataTransfer) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<DataType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, [dataTransfer]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const categories = await getCategoriesAPI(dataTransfer);
      const groupedData: DataType[] = categories.map((category) => ({
        key: category._id,
        name: category.name,
        created_at: category.created_at,
        updated_at: category.updated_at
      }));
      setData(groupedData);
      setError(null);
    } catch (err) {
      setError("Failed to fetch categories.");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetchData: fetchCategories };
};

export default useCategoriesData;
