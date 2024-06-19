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
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
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

const TableBlogs = () => {
  return <Table className="my-5 rounded-none" columns={columns} />;
};

export default TableBlogs;
