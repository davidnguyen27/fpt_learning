import React, { useEffect, useState } from "react";
import { Table, Tooltip, Input } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Category,
  CategorySearchRequest,
  CategorySearchResponse,
} from "../../models/Types";
import { APILink } from "../../const/linkAPI";
import axios from "axios";
import ModalAddCategory from "../Modal/ModalAddCategory"; // Import modal for adding category

const { Search } = Input;

const TableCategories: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [category, setCategory] = useState<Category[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const handleUpdate = (category: Category) => {
    console.log("Update Category:", category);
  };

  const handleDelete = async (category: Category) => {
    console.log("Delete Category:", category);
  };

  useEffect(() => {
    fetchCategories();
  }, [searchKeyword]);

  const fetchCategories = async () => {
    const requestData: CategorySearchRequest = {
      searchCondition: {
        keyword: searchKeyword.trim(),
        is_delete: false,
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
      },
    };
    const response = await fetchCategory(requestData);
    setCategory(response.data.pageData);
  };

  const fetchCategory = async (
    requestData: CategorySearchRequest,
  ): Promise<CategorySearchResponse> => {
    try {
      console.log("Loading categories with:", requestData);

      const token = sessionStorage.getItem("token");

      const response = await axios.post(
        `${APILink}/api/category/search`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data: CategorySearchResponse = response.data;

      console.log("Loading categories successfully, categories:", data);

      return data;
    } catch (error: any) {
      if (error.response) {
        console.error("Loading categories fail.", error.response.data);
        console.error("Status", error.response.status);
        console.error("Headers", error.response.headers);
      } else if (error.request) {
        console.error("No response", error.request);
      } else {
        console.error("Fail", error.message);
      }
      throw error;
    }
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
    // {
    //   title: "Parent Category",
    //   dataIndex: "parent_category_id",
    //   key: "parent_category_id",
    // },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Category) => (
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
        dataSource={category}
        rowKey={(record) => record._id}
      />
    </>
  );
};

export default TableCategories;
