import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useSider } from "../../app/context/SiderContext";
import { AppFooter, AppHeader, AppSider } from "../../components";
import Sider from "antd/es/layout/Sider";
import ReportContents from "../../components/Report/ReportContents";
import ReportForm from "../../components/Report/ReportForm";

const ReportPage = () => {
  const { collapsed } = useSider();

  return (
    <Layout className="flex h-screen w-screen flex-col">
      <Header className="header">
        <AppHeader />
      </Header>
      <Layout className="flex flex-1">
        <Sider
          className="sider"
          collapsed={collapsed}
          collapsedWidth={0}
          trigger={null}
          width={230}
        >
          <AppSider
            className={`transition-all duration-75 ${collapsed ? "w-0" : "w-64"}`}
          />
        </Sider>

        <Layout className="flex flex-1 flex-col">
          <Content className="flex-1 overflow-auto">
            <ReportContents />
            <ReportForm />

            <Footer className="footer mt-auto">
              <AppFooter />
            </Footer>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ReportPage;
