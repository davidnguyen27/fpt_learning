import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import AppHeader from "../../components/Layout/AppHeader";
import AppFooter from "../../components/Layout/AppFooter";
import { useSider } from "../../app/context/SiderContext";
import { AppSider } from "../../components";
import Sider from "antd/es/layout/Sider";

const StudentHomePage: React.FC = () => {
  const { collapsed } = useSider();

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
          width={256}
        >
          <AppSider
            className={`transition-all duration-75 ${collapsed ? "w-0" : "w-64"}`}
          />
        </Sider>
        <Layout className="flex flex-1 flex-col">
          <Content className="flex-1 overflow-y-auto">
            <Footer className="footer">
              <AppFooter />
            </Footer>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default StudentHomePage;
