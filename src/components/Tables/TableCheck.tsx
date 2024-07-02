import { Switch, Table } from "antd";
import type { TableProps } from "antd";

interface DataType {
  key: string;
  course_id: string;
  categoryName: string;
  status: boolean;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Course ID",
    dataIndex: "course_id",
    key: "course_id",
  },
  {
    title: "Category",
    dataIndex: "categoryName",
    key: "categoryName",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: boolean) => <Switch checked={status} />,
  },
];

const data: DataType[] = [
  {
    key: "1",
    course_id: "CS01",
    categoryName: "Web development",
    status: true,
  },
  {
    key: "2",
    course_id: "CS02",
    categoryName: "Design",
    status: false,
  },
  {
    key: "3",
    course_id: "CS03",
    categoryName: "Marketing",
    status: true,
  },
];

const TableCheck = () => {
  return (
    <Table className="my-5 rounded-none" columns={columns} dataSource={data} />
  );
};

export default TableCheck;
