import {
  BarsOutlined,
  CalendarOutlined,
  CommentOutlined,
  FlagOutlined,
  LineChartOutlined,
  ReadOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
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
          icon={<LineChartOutlined />}
          onClick={() => navigate("/admin/dashboard")}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          className="hover:rounded-none hover:bg-amber-500 hover:text-black"
          key="2"
          icon={<BarsOutlined />}
          onClick={() => navigate("/admin/categories-management")}
        >
          Categories
        </Menu.Item>
        <Menu.Item
          className="hover:rounded-none hover:bg-amber-500 hover:text-black"
          key="3"
          icon={<CommentOutlined />}
          onClick={() => navigate("/admin/feedbacks-management")}
        >
          Feedback
        </Menu.Item>
        <Menu.Item
          className="hover:rounded-none hover:bg-amber-500 hover:text-black"
          key="4"
          icon={<FlagOutlined />}
          onClick={() => navigate("/admin/reports-management")}
        >
          Report
        </Menu.Item>
        <Menu.Item
          className="hover:rounded-none hover:bg-amber-500 hover:text-black"
          key="5"
          icon={<UserOutlined />}
          onClick={() => navigate("/admin/users-management")}
        >
          Users
        </Menu.Item>
        <Menu.Item
          className="hover:rounded-none hover:bg-amber-500 hover:text-black"
          key="6"
          icon={<CalendarOutlined />}
          onClick={() => navigate("/admin/blogs-management")}
        >
          Blogs
        </Menu.Item>
        <Menu.Item
          className="hover:rounded-none hover:bg-amber-500 hover:text-black"
          key="7"
          icon={<ReadOutlined />}
          onClick={() => navigate("/admin/courses-check")}
        >
          Courses
        </Menu.Item>
        <Menu.Item
          className="hover:rounded-none hover:bg-amber-500 hover:text-black"
          key="8"
          icon={<SettingOutlined />}
          onClick={() => navigate("/setting")}
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
