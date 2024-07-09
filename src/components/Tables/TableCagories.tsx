import React, { useEffect, useState } from "react";
import { Table, Tooltip, Input, Modal } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/redux/store";
import { Category } from "../../models/Types";
import ModalAddCategory from "../Modal/ModalAddCategory";
import {
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../app/redux/categories/categorySlice";
import ModalEditCategory from "../Modal/ModalEditCategory";

const { Search } = Input;

const TableCategories: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading, error } = useSelector(
    (state: RootState) => state.category,
  );
  const [open, setOpen] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<
    Category["pageData"][number] | null
  >(null);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  useEffect(() => {
    dispatch(getCategories(searchKeyword));
  }, [dispatch, searchKeyword]);

  const handleUpdate = (category: Category["pageData"][number]) => {
    setCurrentCategory(category);
    setOpen(true);
  };

  const handleUpdateCategory = async (
    values: Partial<Category["pageData"][number]>,
  ) => {
    try {
      if (currentCategory) {
        await dispatch(
          updateCategory({
            categoryId: currentCategory._id,
            categoryData: values,
          }),
        ).unwrap();
        setOpen(false);
      }
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };

  const handleDelete = (categoryId: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this category?",
      onOk: () => {
        dispatch(deleteCategory(categoryId))
          .unwrap()
          .then(() => {
            console.log("Category deleted successfully");
          })
          .catch((error) => {
            console.error("Failed to delete category:", error);
          });
      },
    });
  };

  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Category["pageData"][number]) => (
        <div>
          <Tooltip title="Edit">
            <EditOutlined
              onClick={() => handleUpdate(record)}
              style={{ fontSize: "16px", marginRight: 16, cursor: "pointer" }}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <DeleteOutlined
              onClick={() => handleDelete(record._id)}
              style={{ fontSize: "16px", color: "red", cursor: "pointer" }}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="my-3 flex items-center justify-between">
        <Search
          placeholder="Search by category name"
          allowClear
          onSearch={setSearchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          style={{ width: 300 }}
        />
        <button
          className="rounded-lg bg-red-500 px-5 py-2 text-sm font-medium text-white hover:bg-red-600"
          onClick={() => setOpen(true)}
        >
          Add Category
        </button>
        <ModalAddCategory open={open} setOpen={setOpen} />
        <ModalEditCategory
          open={open}
          setOpen={setOpen}
          currentCategory={currentCategory}
          onSubmit={handleUpdateCategory}
        />
      </div>
      <Table
        className="my-5 rounded-none"
        columns={columns}
        dataSource={categories}
        rowKey={(record) => record._id}
        loading={loading}
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
    </>
  );
};

export default TableCategories;
