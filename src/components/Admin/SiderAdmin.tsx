import {
  BarsOutlined,
  LineChartOutlined,
  ReadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Divider, Menu } from "antd";
import { Footer } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";

const SiderAdmin: React.FC<{ className?: string }> = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col">
      <Menu
        mode="inline"
        // defaultSelectedKeys={["1"]}
        className="flex-grow bg-slate-200 text-sm"
      >
        <Menu.Item
          className="hover:rounded-none hover:bg-red-500 hover:text-black"
          key="1"
          icon={<LineChartOutlined />}
          onClick={() => navigate("/admin/dashboard")}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          className="hover:rounded-none hover:bg-red-500 hover:text-white"
          key="2"
          icon={<BarsOutlined />}
          onClick={() => navigate("/admin/categories-management")}
        >
          Categories
        </Menu.Item>
        {/* <Menu.Item
          className="hover:rounded-none hover:bg-red-500 hover:text-white"
          key="3"
          icon={<CommentOutlined />}
          onClick={() => navigate("/admin/feedbacks-management")}
        >
          Feedback
        </Menu.Item> */}
        {/* <Menu.Item
          className="hover:rounded-none hover:bg-red-500 hover:text-white"
          key="4"
          icon={<FlagOutlined />}
          onClick={() => navigate("/admin/reports-management")}
        >
          Report
        </Menu.Item> */}
        <Menu.Item
          className="hover:rounded-none hover:bg-red-500 hover:text-white"
          key="3"
          icon={<UserOutlined />}
          onClick={() => navigate("/admin/users-management")}
        >
          Users
        </Menu.Item>
        {/* <Menu.Item
          className="hover:rounded-none hover:bg-red-500 hover:text-white"
          key="6"
          icon={<CalendarOutlined />}
          onClick={() => navigate("/admin/blogs-management")}
        >
          Blogs
        </Menu.Item> */}
        <Menu.Item
          className="hover:rounded-none hover:bg-red-500 hover:text-white"
          key="7"
          icon={<ReadOutlined />}
          onClick={() => navigate("/admin/courses-check")}
        >
          Courses
        </Menu.Item>
      </Menu>
      <Divider />
      <Footer className="bg-slate-200 px-8 pb-4 pt-0 text-center">
        <span className="text-xs font-normal">
          Copyright by FPT Education @2024
        </span>
      </Footer>
    </div>
  );
};

export default SiderAdmin;
