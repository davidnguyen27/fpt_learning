import { Layout, Tabs, TabsProps } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { AppFooter, AppHeader } from "../../components";
import Sider from "antd/es/layout/Sider";
import { useSider } from "../../app/context/SiderContext";
import SiderInstructor from "../../components/Instructor/SiderInstructor";
import TableCourses from "../../components/Tables/TableCourses";
import TablePurchases from "../../components/Tables/TablePurchases";
import { useNavigate } from "react-router-dom";
import "../../styles/tabCustom.css";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: (
      <span className="text-sm font-medium">
        <i className="fa-solid fa-book-open"></i> Courses
      </span>
    ),
    children: <TableCourses />,
  },
  {
    key: "2",
    label: (
      <span className="text-sm font-medium">
        <i className="fa-solid fa-receipt"></i> My Courses
      </span>
    ),
    children: <TablePurchases />,
  },
  {
    key: "3",
    label: (
      <span className="text-sm font-medium">
        <i className="fa-solid fa-up-long"></i> Upcoming Courses
      </span>
    ),
    children: <TableCourses />,
  },
];

const CoursesManagePage = () => {
  const { collapsed } = useSider();
  const navigate = useNavigate();

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
                <h1 className="text-xl font-bold">Courses</h1>
              </section>
              <div className="mt-4 flex items-center justify-between bg-slate-200 p-4">
                <div className="flex items-center">
                  <i className="fa-solid fa-book-open"></i>
                  <span className="text-md ml-4 font-semibold">
                    Jump Into Course Creation
                  </span>
                </div>
                <div>
                  <button
                    className="rounded-lg bg-amber-500 px-5 py-2 text-sm font-medium hover:bg-amber-600"
                    onClick={() => navigate("/create-course")}
                  >
                    Create Your Courses
                  </button>
                </div>
              </div>
              <Tabs defaultActiveKey="1" items={items} className="mt-10" />
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

export default CoursesManagePage;
