import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { AppFooter, AppHeader } from "../../components";
import Sider from "antd/es/layout/Sider";
import SiderAdmin from "../../components/Admin/SiderAdmin";
import { useSider } from "../../app/context/SiderContext";
import InforAdmin from "../../components/Info/InforAdmin";

const ProfilePage = () => {
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
                <h1 className="text-xl font-bold">Admin profile</h1>
                <InforAdmin />
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

export default ProfilePage;
