import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { AppFooter, AppHeader } from "../../components";
import { useSider } from "../../app/context/SiderContext";
import SiderAdmin from "../../components/Admin/SiderAdmin";
import TableCategories from "../../components/Tables/TableCagories";
import { useState } from "react";
import ModalAddCategory from "../../components/Modal/ModalAddCategory";

const CategoriesManagePage = () => {
  const { collapsed } = useSider();

  const [open, setOpen] = useState<boolean>(false);

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
                <h1 className="text-xl font-bold">Categories Management</h1>
              </section>
              <div className="my-3 flex items-center justify-between">
                <div className="flex items-center">
                  <i className="fa-solid fa-filter"></i>
                  <div className="mx-4">
                    Category name:
                    <select className="ml-2" title="Category">
                      <option value="">Web Development</option>
                      <option value="instructor">Business</option>
                      <option value="student">Data & Analytics</option>
                      <option value="student">Information Technology</option>
                      <option value="student">Marketing</option>
                      <option value="student">Office Productivity</option>
                    </select>
                  </div>
                </div>
                <button
                  className="rounded-lg bg-red-500 px-5 py-2 text-sm font-medium text-white hover:bg-red-600"
                  onClick={() => setOpen(true)}
                >
                  Add Category
                </button>
                <ModalAddCategory open={open} setOpen={setOpen} />
              </div>
              <TableCategories />
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

export default CategoriesManagePage;
