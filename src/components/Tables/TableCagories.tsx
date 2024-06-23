import { Space, Table } from "antd";
import type { TableProps } from "antd";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Course ID",
    dataIndex: "course_id",
    key: "course_id",
  },
  {
    title: "Instructor",
    dataIndex: "fullName",
    key: "fullName",
  },
  {
    title: "Category",
    dataIndex: "categoryName",
    key: "categoryName",
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Space size="middle">
        <a>
          <i className="fa-solid fa-file-pen"></i>
        </a>
        <a>
          <i className="fa-solid fa-trash"></i>
        </a>
      </Space>
    ),
  },
];

const TableCategories = () => {
  return <Table className="my-5 rounded-none" columns={columns} />;
};

export default TableCategories;
