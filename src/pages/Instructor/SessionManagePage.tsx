import { Tabs, TabsProps } from "antd";
import { ExceptionOutlined } from "@ant-design/icons";
import "../../styles/tabCustom.css";
import TableSessions from "../../components/Tables/TableSessions";
import InstructorLayout from "../../components/Layout/InstructorLayout";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: (
      <span className="text-sm font-medium">
        <ExceptionOutlined /> Sessions
      </span>
    ),
    children: <TableSessions />,
  },
];

const SessionManagePage = () => {
  return (
    <InstructorLayout>
      <section>
        <h1 className="text-xl font-bold">Session Management</h1>
      </section>
      <Tabs defaultActiveKey="1" items={items} className="mt-10" />
    </InstructorLayout>
  );
};

export default SessionManagePage;
