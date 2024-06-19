import { Divider, Menu } from "antd";
import { Footer } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";

const SiderAdmin: React.FC<{ className?: string }> = () => {
  const navigate = useNavigate();

  return (
    <>
      <Menu
        mode="inline"
        // defaultSelectedKeys={["1"]}
        className="bg-slate-200 text-sm"
      >
        <Menu.Item
          className="hover:rounded-none hover:bg-amber-500 hover:text-black"
          key="1"
          icon={<i className="fa-solid fa-chart-line"></i>}
          onClick={() => navigate("/admin-dashboard")}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          className="hover:rounded-none hover:bg-amber-500 hover:text-black"
          key="2"
          icon={<i className="fa-solid fa-list"></i>}
          onClick={() => navigate("/categories-management")}
        >
          Categories
        </Menu.Item>
        <Menu.Item
          className="hover:rounded-none hover:bg-amber-500 hover:text-black"
          key="3"
          icon={<i className="fa-solid fa-comment-dots"></i>}
          onClick={() => navigate("/feedbacks-management")}
        >
          Feedback
        </Menu.Item>
        <Menu.Item
          className="hover:rounded-none hover:bg-amber-500 hover:text-black"
          key="4"
          icon={<i className="fa-solid fa-flag"></i>}
          onClick={() => navigate("/reports-management")}
        >
          Report
        </Menu.Item>
        <Menu.Item
          className="hover:rounded-none hover:bg-amber-500 hover:text-black"
          key="5"
          icon={<i className="fa-solid fa-users"></i>}
          onClick={() => navigate("/users-management")}
        >
          Users
        </Menu.Item>
        <Menu.Item
          className="hover:rounded-none hover:bg-amber-500 hover:text-black"
          key="6"
          icon={<i className="fa-solid fa-flag"></i>}
          onClick={() => navigate("/blogs-management")}
        >
          Blogs
        </Menu.Item>
        <Menu.Item
          className="hover:rounded-none hover:bg-amber-500 hover:text-black"
          key="7"
          icon={<i className="fa-solid fa-check"></i>}
          onClick={() => navigate("/courses-check")}
        >
          Courses
        </Menu.Item>
        <Menu.Item
          className="hover:rounded-none hover:bg-amber-500 hover:text-black"
          key="8"
          icon={<i className="fa-solid fa-wrench"></i>}
          onClick={() => navigate("/admin-setting")}
        >
          Setting
        </Menu.Item>
      </Menu>
      <Divider />
      <Footer className="bg-slate-200 px-8 py-0 text-center">
        <span className="text-xs font-light">
          Copyright by FPT Education @2024
        </span>
      </Footer>
    </>
  );
};

export default SiderAdmin;
