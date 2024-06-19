import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import AppHeader from "../components/Layout/AppHeader";
import { AppSider } from "../components";
import AppFooter from "../components/Layout/AppFooter";
import { useSider } from "../app/context/SiderContext";
import HelpContent from "../components/Help/HelpContent";

const HelpPage: React.FC = () => {
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
            <HelpContent />
            <Footer className="footer">
              <AppFooter />
            </Footer>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default HelpPage;
