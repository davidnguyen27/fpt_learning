import { message } from "antd";
import { useState } from "react";
import { createCategoryAPI } from "../../services/categoryService";
import { Category } from "../../models/Category";

const useAddCategory = (onSuccess: () => void) => {
  const [loading, setLoading] = useState<boolean>(false);

  const createCategory = async (categoryData: Category) => {
    try {
      setLoading(true);
      await createCategoryAPI(categoryData);
      message.success("Category added successfully");
      onSuccess();
    } catch (error) {
      message.error("Failed to add category!");
    } finally {
      setLoading(false);
    }
  };

  return { createCategory, loading };
};

export default useAddCategory;
