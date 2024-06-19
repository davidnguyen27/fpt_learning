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
import { useState } from "react";
import ModalCreateAcc from "../../components/Modal/ModalCreateAcc";

const UserManagePage = () => {
  const { collapsed } = useSider();
  const dispatch = useDispatch<AppDispatch>();

  const [isOpen, setIsOpen] = useState<boolean>(false);

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
                <h1 className="text-xl font-bold">Student Management</h1>
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
                    Role:
                    <select className="ml-2" onChange={handleRoleChange}>
                      <option value="">All</option>
                      <option value="instructor">Instructor</option>
                      <option value="student">Student</option>
                    </select>
                  </div>
                  <div>
                    Status:
                    <select className="ml-2" onChange={handleStatusChange}>
                      <option value="">All</option>
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  </div>
                </div>
                <div>
                  <button
                    className="rounded-lg bg-amber-500 px-5 py-2 text-sm font-medium hover:bg-amber-600"
                    onClick={() => setIsOpen(true)}
                  >
                    Create account
                  </button>
                  <ModalCreateAcc isOpen={isOpen} setIsOpen={setIsOpen} />
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
