import { useState, useMemo, useEffect } from "react";
import { Space, Table, Button, Modal, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Blog, DataTransfer } from "../../models/Blog";
import useBlogsData from "../../hooks/blog/useBlogData";
import ModalAddBlog from "../Modal/ModalAddBlog";
import useDeleteBlog from "../../hooks/blog/useDeleteBlog";
import ModalUpdateBlog from "../Modal/ModalUpdateBlog";
import { getUserDetail } from "../../services/usersService";
import { UserData } from "../../models/Types";

const TableBlogs = () => {
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [updateBlogId, setupdateBlogId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<UserData | undefined>(
    undefined,
  );

  const storagedUser = sessionStorage.getItem("user");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      if (storagedUser && token) {
        try {
          const parsedUser = JSON.parse(storagedUser);
          const userId = parsedUser.data._id;

          const userData = (await getUserDetail(userId, token)) as UserData;
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
        category_id: "",
        is_delete: false,
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 100,
      },
    }),
    [],
  );

  const { data, loading, refetchData } = useBlogsData(dataTransfer);
  const { deleteBlog } = useDeleteBlog(refetchData);

  const handleSuccess = () => {
    refetchData();
  };

  const handleUpdate = (blogId: string) => {
    setOpenUpdate(true);
    setupdateBlogId(blogId);
  };

  const handleDelete = (blogId: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this category?",
      onOk: () => deleteBlog(blogId),
    });
  };

  return (
    <>
      <Button
        onClick={() => setOpenAdd(true)}
        className="rounded-lg bg-red-500 px-5 py-2 text-sm font-medium text-white hover:bg-red-600"
      >
        Add Blog
      </Button>
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
