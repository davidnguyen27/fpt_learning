import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import AppHeader from "../../components/Layout/AppHeader";
import Sider from "antd/es/layout/Sider";
import { useSider } from "../../app/context/SiderContext";
import AppFooter from "../../components/Layout/AppFooter";
import SiderAdmin from "../../components/Admin/SiderAdmin";
import Overview from "../../components/Admin/Overview";
import TotalUserChart from "../../components/Charts/TotalUserChart";
import TotalInstructorChart from "../../components/Charts/TotalInstructorChart";
import FeedbackChart from "../../components/Charts/FeedbackChart";

const AdminPage = () => {
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
          <SiderAdmin
            className={`transition-all duration-75 ${collapsed ? "w-0" : "w-64"}`}
          />
        </Sider>
        <Layout className="flex flex-1 flex-col">
          <Content className="flex-1 overflow-y-auto">
            <div className="p-8">
              <section>
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
                <Overview />
                <div className="mt-10 grid grid-cols-2 gap-2">
                  <div className="text-center">
                    <TotalUserChart />
                    <p className="text-sm font-bold">User chart</p>
                  </div>
                  <div className="text-center">
                    <TotalInstructorChart />
                    <p className="text-sm font-bold">Instructor chart</p>
                  </div>
                </div>
                <div className="mt-10 grid grid-cols-2 gap-2">
                  <div className="text-center">
                    <FeedbackChart />
                    <p className="text-sm font-bold">Feedback chart</p>
                  </div>
                  <div className="text-center">
                    <TotalInstructorChart />
                    <p className="text-sm font-bold">Report chart</p>
                  </div>
                </div>
              </section>
            </div>
            <Footer className="footer mt-10">
              <AppFooter />
            </Footer>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminPage;
