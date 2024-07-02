import { Space, Table } from "antd";
import type { TableProps } from "antd";
import { useState } from "react";
import ModalEditCategory from "../Modal/ModalEditCategory";
import confirm from "antd/es/modal/confirm";
import { ExclamationCircleFilled } from "@ant-design/icons";

interface DataType {
  key: string;
  course_id: string;
  categoryName: string;
}

const dataSource = [
  {
    key: "1",
    course_id: "CS001",
    categoryName: "Web Development",
  },
  {
    key: "2",
    course_id: "CS002",
    categoryName: "Information Technology",
  },
];

const showDeleteConfirm = () => {
  confirm({
    title: "Are you sure you want to delete this?",
    icon: <ExclamationCircleFilled />,
    content: "It will be deleted this category name!",
    okText: "Yes",
    okType: "primary",
    cancelText: "Cancel",
    onOk() {
      console.log("OK");
    },
    onCancel() {
      console.log("Cancel");
    },
  });
};

const TableCategories = () => {
  const [open, setOpen] = useState<boolean>(false);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Course ID",
      dataIndex: "course_id",
      key: "course_id",
    },
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <a>
            <i
              className="fa-solid fa-file-pen"
              onClick={() => setOpen(true)}
            ></i>
          </a>
          <a>
            <button onClick={showDeleteConfirm}>
              <i className="fa-solid fa-trash"></i>
            </button>
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        className="my-5 rounded-none"
        columns={columns}
        dataSource={dataSource}
      />
      <ModalEditCategory open={open} setOpen={setOpen} />
    </>
  );
};

export default TableCategories;
