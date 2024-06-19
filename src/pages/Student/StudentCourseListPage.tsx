import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useSider } from "../../app/context/SiderContext";

import {
  AppFooter,
  AppHeader,
  AppSider,

  StudentCourseListContent,
} from "../../components";

const StudentCourseListPage: React.FC = () => {
  const siderContext = useSider();

  const { collapsed } = siderContext;

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
            <div className="p-8">
              <section>
              <div className="mb-5 flex w-full justify-between">
                  <h1 className="text-xl font-bold">Enrolled Courses</h1>
                  
                </div>
                <StudentCourseListContent />
                <div className="flex justify-center mt-5">
                  <button
                    type="button"
                    className="py-2 md:py-3 px-3 md:px-4 bg-gray-700 text-white rounded border hover:bg-red-500 w-20 md:w-24 lg:w-28"
                  >
                    See All
                  </button>
                </div>
              </section>
              
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

export default StudentCourseListPage;
