import { useState } from "react";
import { deleteCategoryAPI } from "../../services/categoryService";
import { message } from "antd";

const useDeleteCategory = (onSuccess: () => void) => {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteCategory = async (categoryId: string) => {
    try {
      setLoading(true);
      await deleteCategoryAPI(categoryId);
      message.success("Category deleted successfully");
      onSuccess(); // Call onSuccess to refresh the lessons list
    } catch (error) {
      message.error("Failed to delete category");
    } finally {
      setLoading(false);
    }
  };

  return { deleteCategory, loading };
};

export default useDeleteCategory;
