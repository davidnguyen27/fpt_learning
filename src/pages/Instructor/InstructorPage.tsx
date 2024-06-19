import { useSider } from "../../app/context/SiderContext";
import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Header, Content, Footer } from "antd/es/layout/layout";
import { AppHeader, AppFooter } from "../../components";
import SiderInstructor from "../../components/Instructor/SiderInstructor";
import Overview from "../../components/Admin/Overview";

const InstructorPage: React.FC = () => {
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
                <h1 className="text-xl font-bold">Instructor Dashboard</h1>
                <Overview />
              </section>
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

export default InstructorPage;
