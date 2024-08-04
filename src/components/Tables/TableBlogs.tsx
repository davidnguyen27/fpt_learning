import { useState, useMemo, useEffect } from "react";
import { Space, Table, Button, Modal, message, Input, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Blog, DataTransfer } from "../../models/Blog";
import useBlogsData from "../../hooks/blog/useBlogData";
import ModalAddBlog from "../Modal/ModalAddBlog";
import useDeleteBlog from "../../hooks/blog/useDeleteBlog";
import ModalUpdateBlog from "../Modal/ModalUpdateBlog";
import { getUserDetail } from "../../services/usersService";
import { UserData } from "../../models/Types";

const { Option } = Select;

const TableBlogs = () => {
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [updateBlogId, setUpdateBlogId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<UserData | undefined>(undefined);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const storagedUser = sessionStorage.getItem("user");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      if (storagedUser && token) {
        try {
          const parsedUser = JSON.parse(storagedUser);
          const userId = parsedUser.data._id;

          const userData = (await getUserDetail(userId)) as UserData;
          setCurrentUser(userData);
        } catch (error: any) {
          message.error(error.message);
        }
      } else {
        message.error("User not found in session or token missing.");
      }
    };

    fetchUserData();
  }, [storagedUser, token]);

  const columns: ColumnsType<Blog> = [
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text: string) => (
        <div
          style={{
            maxWidth: "200px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: "Image",
      dataIndex: "image_url",
      key: "image_url",
      render: (text: string) => (
        <div
          style={{
            maxWidth: "150px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <a href={text} target="_blank" rel="noopener noreferrer">
            {text}
          </a>
        </div>
      ),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (text: string) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleUpdate(record._id)}>
            <i className="fa-solid fa-eye"></i>
          </a>
          <a onClick={() => handleDelete(record._id)}>
            <i className="fa-solid fa-trash"></i>
          </a>
        </Space>
      ),
    },
  ];

  const dataTransfer: DataTransfer = useMemo(
    () => ({
      searchCondition: {
        keyword: searchText,
        category_id: selectedCategory,
        is_delete: false,
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 100,
      },
    }),
    [searchText, selectedCategory]
  );

  const { data, loading, refetchData } = useBlogsData(dataTransfer);
  const { deleteBlog } = useDeleteBlog(refetchData);

  const handleSuccess = () => {
    refetchData();
  };

  const handleUpdate = (blogId: string) => {
    setOpenUpdate(true);
    setUpdateBlogId(blogId);
  };

  const handleDelete = (blogId: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this blog?",
      onOk: () => deleteBlog(blogId),
    });
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  return (
    <>
      <div style={{ marginBottom: 16, display: "flex", gap: "16px", justifyContent: "space-between" }}>
      <div className="flex space-x-2">

        <Input.Search
          placeholder="Search by title or description"
          allowClear
          onSearch={handleSearch}
          style={{ width: 300 }}
        />
        <Select
          placeholder="Select Category"
          style={{ width: 200 }}
          onChange={handleCategoryChange}
          value={selectedCategory}
        >
          <Option value="">All Categories</Option>
          {/* Replace with your actual categories */}
          <Option value="tech">Tech</Option>
          <Option value="lifestyle">Lifestyle</Option>
          <Option value="education">Education</Option>
        </Select>
        </div>

        <Button
        type="primary"
        danger
          onClick={() => setOpenAdd(true)}
          className="px-6 py-2"
        >
          Add Blog
        </Button>
      </div>
      <Table<Blog>
        className="my-5 rounded-none"
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="_id"
      />
      <ModalAddBlog
        open={openAdd}
        setOpen={setOpenAdd}
        onSuccess={handleSuccess}
      />
      <ModalUpdateBlog
        open={openUpdate}
        setOpen={setOpenUpdate}
        blogId={updateBlogId}
        onSuccess={handleSuccess}
        currentUser={currentUser}
      />
    </>
  );
};

export default TableBlogs;
