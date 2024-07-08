import { Tabs, TabsProps } from "antd";
import { ExceptionOutlined } from "@ant-design/icons";
import "../../styles/tabCustom.css";
import TableSessions from "../../components/Tables/TableSessions";
import MainLayout from "../../components/Layout/MainLayout";

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
    <MainLayout>
      <section>
        <h1 className="text-xl font-bold">Session Management</h1>
      </section>
      <Tabs defaultActiveKey="1" items={items} className="mt-10" />
    </MainLayout>
  );
};

export default SessionManagePage;
