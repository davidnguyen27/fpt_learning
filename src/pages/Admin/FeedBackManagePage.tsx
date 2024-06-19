import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { AppFooter, AppHeader } from "../../components";
import Sider from "antd/es/layout/Sider";
import { useSider } from "../../app/context/SiderContext";
import SiderAdmin from "../../components/Admin/SiderAdmin";
import TableFeedbacks from "../../components/Tables/TableFeedbacks";

const FeedBackManagePage = () => {
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
          <SiderAdmin
            className={`transition-all duration-75 ${collapsed ? "w-0" : "w-64"}`}
          />
        </Sider>
        <Layout className="flex flex-1 flex-col">
          <Content className="flex-1 overflow-y-auto">
            <div className="p-8">
              <section>
                <h1 className="text-xl font-bold">Feedback Management</h1>
              </section>
              <div className="mt-4 bg-slate-200 p-4">
                <input
                  style={{ width: "100%" }}
                  type="text"
                  placeholder="Search by phone..."
                  className="h-8 rounded-md pl-8 text-xs"
                />
              </div>
              <div className="my-3 flex items-center justify-between">
                <div className="flex items-center">
                  <i className="fa-solid fa-filter"></i>
                  <div className="mx-4">
                    Category name:
                    <select className="ml-2">
                      <option value="">Web Development</option>
                      <option value="instructor">Business</option>
                      <option value="student">Design</option>
                    </select>
                  </div>
                </div>
              </div>
              <TableFeedbacks />
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

export default FeedBackManagePage;
