import { useEffect, useState } from "react";
import { Category, DataTransfer } from "../../models/Category";
import { getCategoriesClientAPI } from "../../services/categoryService";

const useCategoriesClient = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const dataTransfer: DataTransfer = {
          searchCondition: { keyword: "", is_delete: false, is_parent: true },
          pageInfo: { pageNum: 1, pageSize: 10 },
        };
        const categories = await getCategoriesClientAPI(dataTransfer);
        setCategories(categories);
      } catch (error: any) {
        throw new Error(error.message);
      }
    };

    fetchCategories();
  }, []);

  return { categories };
};

export default useCategoriesClient;
