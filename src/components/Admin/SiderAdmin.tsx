import {
  BarsOutlined,

  LineChartOutlined,
  ReadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Divider, Menu } from "antd";
import { Footer } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";

const SiderAdmin: React.FC<{ className?: string }> = () => {
  const navigate = useNavigate();

  const menuItems: MenuProps["items"] = [
    {
      key: "1",
      icon: <LineChartOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/admin/dashboard"),
      className: "hover:rounded-none hover:bg-red-500 hover:text-black",
    },
    {
      key: "2",
      icon: <BarsOutlined />,
      label: "Categories",
      onClick: () => navigate("/admin/categories-management"),
      className: "hover:rounded-none hover:bg-red-500 hover:text-white",
    },
    {
      key: "3",
      icon: <UserOutlined />,
      label: "Users",
      onClick: () => navigate("/admin/users-management"),
      className: "hover:rounded-none hover:bg-red-500 hover:text-white",
    },
    {
      key: "7",
      icon: <ReadOutlined />,
      label: "Courses",
      onClick: () => navigate("/admin/courses-check"),
      className: "hover:rounded-none hover:bg-red-500 hover:text-white",
    },
  ];

  return (
    <div className="flex h-full flex-col">
      <Menu
        mode="inline"
        items={menuItems}
        className="flex-grow bg-slate-200 text-sm"
      />
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
