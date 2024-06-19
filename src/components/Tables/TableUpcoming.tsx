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
    title: "Course Id",
    dataIndex: "course_id",
    key: "courseName",
  },
  {
    title: "Course Name",
    dataIndex: "courseName",
    key: "courseName",
  },
  {
    title: "Category",
    dataIndex: "categoryName",
    key: "categoryName",
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Space size="middle">
        <a>
          <i className="fa-solid fa-eye"></i>
        </a>
        <a>
          <i className="fa-solid fa-trash"></i>
        </a>
      </Space>
    ),
  },
];

const TableUpcoming = () => {
  return <Table className="my-5 rounded-none" columns={columns} />;
};

export default TableUpcoming;
