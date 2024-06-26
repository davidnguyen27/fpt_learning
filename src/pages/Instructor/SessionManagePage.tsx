import { Layout, Tabs, TabsProps } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { AppFooter, AppHeader } from "../../components";
import Sider from "antd/es/layout/Sider";
import { useSider } from "../../app/context/SiderContext";
import SiderInstructor from "../../components/Instructor/SiderInstructor";
import { ExceptionOutlined } from "@ant-design/icons";
import "../../styles/tabCustom.css";
import TableSessions from "../../components/Tables/TableSessions";

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
  const { collapsed } = useSider();
//   const navigate = useNavigate();

  return (
    <Layout className="flex h-screen w-screen flex-col">
      <Header className="header">
        <AppHeader />
      </Header>
      <Layout className="flex flex-1 overflow-y-auto">
        <Sider
          className="sider"
          collapsed={collapsed}
          collapsedWidth={0}
          trigger={null}
          width={230}
        >
          <SiderInstructor
            className={`transition-all duration-75 ${collapsed ? "w-0" : "w-64"}`}
          />
        </Sider>
        <Layout className="flex flex-1 flex-col">
          <Content className="flex-1 overflow-y-auto">
            <div className="p-8">
              <section>
                <h1 className="text-xl font-bold">Session Management</h1>
              </section>
              <Tabs defaultActiveKey="1" items={items} className="mt-10" />
            </div>
            <Footer className="footer">
            <AppFooter />
          </Footer>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default SessionManagePage;