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
    title: "Course Name",
    dataIndex: "courseName",
    key: "courseName",
  },
  {
    title: "Vendor",
    dataIndex: "instructorName",
    key: "instructorName",
  },
  {
    title: "Category",
    dataIndex: "categoryName",
    key: "categoryName",
  },
  {
    title: "Learn",
    dataIndex: "learn",
    key: "learn",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
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

const TablePurchases = () => {
  return <Table className="my-5 rounded-none" columns={columns} />;
};

export default TablePurchases;
