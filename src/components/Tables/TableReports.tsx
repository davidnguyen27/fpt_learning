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
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
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

const TableReport = () => {
  return <Table className="my-5 rounded-none" columns={columns} />;
};

export default TableReport;
