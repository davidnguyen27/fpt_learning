import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { AppFooter, AppHeader } from "../../components";
import { useSider } from "../../app/context/SiderContext";
import SiderAdmin from "../../components/Admin/SiderAdmin";
import TableUsers from "../../components/Tables/TableUsers";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/redux/store";
import { filterRole, filterStatus } from "../../app/redux/user/userSlice";



const UserManagePage = () => {
  const { collapsed } = useSider();
  const dispatch = useDispatch<AppDispatch>();



  const handleRoleChange = (e: any) => {
    dispatch(filterRole(e.target.value));
  };

  const handleStatusChange = (e: any) => {
    dispatch(filterStatus(e.target.value));
  };

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
          <SiderAdmin
            className={`transition-all duration-75 ${collapsed ? "w-0" : "w-64"}`}
          />
        </Sider>
        <Layout className="flex flex-1 flex-col">
          <Content className="flex-1 overflow-y-auto">
            <div className="p-8">
              <section>
                <h1 className="text-xl font-bold">User Management</h1>
              </section>
              <div className="my-3 flex items-center justify-between">
                <div className="flex items-center">
                  <i className="fa-solid fa-filter"></i>
                  <div className="mx-4">
                    Role:
                    <select className="ml-2" onChange={handleRoleChange} title="Role">
                      <option value="">All</option>
                      <option value="instructor">Instructor</option>
                      <option value="student">Student</option>
                    </select>
                  </div>
                  <div>
                    Status:
                    <select className="ml-2" onChange={handleStatusChange} title="Status">
                      <option value="">All</option>
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  </div>
                </div>
                
              </div>
              <TableUsers />
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

export default UserManagePage;
