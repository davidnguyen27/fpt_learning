import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { AppFooter, AppHeader } from "../../components";
import Sider from "antd/es/layout/Sider";
import { useSider } from "../../app/context/SiderContext";
import SiderInstructor from "../../components/Instructor/SiderInstructor";
import StepsCreateCourse from "../../components/Instructor/StepsCreateCourse";

const CreateCoursePage = () => {
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
            <section className="p-8">
              <h1 className="text-xl font-bold">Create New Course</h1>
              <StepsCreateCourse />
            </section>
            <Footer className="footer">
              <AppFooter />
            </Footer>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default CreateCoursePage;
