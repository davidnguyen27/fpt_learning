import { useState } from "react";
import { editCategoryAPI } from "../../services/categoryService";
import { message } from "antd";
import { Category } from "../../models/Category";

const useEditCategory = (onSuccess: () => void) => {
  const [loading, setLoading] = useState<boolean>(false);

  const editCategory = async (
    categoryId: string,
    categoryData: Category,
  ) => {
    try {
      setLoading(true);
      await editCategoryAPI(categoryId, categoryData);
      message.success("Category updated successfully");
      onSuccess();
    } catch (error) {
      message.error("Failed to update category");
    } finally {
      setLoading(false);
    }
  };

  return { editCategory, loading };
};

export default useEditCategory;
