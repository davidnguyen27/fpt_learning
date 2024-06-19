import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import AppHeader from "../components/Layout/AppHeader";
import Sider from "antd/es/layout/Sider";
import { AppSider } from "../components";
import AppFooter from "../components/Layout/AppFooter";
import { useSider } from "../app/context/SiderContext";
import DetailCourseContent from "../components/User/DetailCourseContent";

const DetailCoursePage: React.FC = () => {
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
          width={256}
        >
          <AppSider
            className={`transition-all duration-75 ${collapsed ? "w-0" : "w-64"}`}
          />
        </Sider>
        <Layout className="flex flex-1 flex-col">
          <Content className="flex-1 overflow-y-auto">
            <div className="p-4">
              <DetailCourseContent />
            </div>
            <Footer className="footer mt-auto">
              <AppFooter />
            </Footer>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DetailCoursePage;
