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

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
  {
    key: "4",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
  {
    key: "5",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
  {
    key: "6",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
  {
    key: "7",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

const TableCategories = () => {
  return (
    <Table className="my-5 rounded-none" columns={columns} dataSource={data} />
  );
};

export default TableCategories;
