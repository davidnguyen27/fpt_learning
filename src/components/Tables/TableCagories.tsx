import React, { useEffect, useState } from "react";
import { Table, Tooltip, Input } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/redux/store";
import { Category } from "../../models/Types";
import ModalAddCategory from "../Modal/ModalAddCategory";
import { getCategories } from "../../app/redux/categories/categorySlice";

const { Search } = Input;

const TableCategories: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading, error } = useSelector(
    (state: RootState) => state.category,
  );
  const [open, setOpen] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch, searchKeyword]);

  const handleUpdate = (category: Category["pageData"][number]) => {
    console.log("Update Category:", category);
  };

  const handleDelete = async (category: Category["pageData"][number]) => {
    console.log("Delete Category:", category);
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
              onClick={() => handleDelete(record)}
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
