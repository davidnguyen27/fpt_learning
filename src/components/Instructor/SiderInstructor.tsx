import {
  AppstoreOutlined,
  BarChartOutlined,
  DollarOutlined,
  ExceptionOutlined,
  ReadOutlined,
  StarOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { Divider, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import { Footer } from "antd/es/layout/layout";

const SiderInstructor: React.FC<{ className?: string }> = () => {
  const navigate = useNavigate();

  const menuItems: MenuProps["items"] = [
    {
      key: "1",
      icon: <AppstoreOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/instructor/dashboard"),
    },
    {
      key: "2",
      icon: <ReadOutlined />,
      label: "Courses",
      onClick: () => navigate("/instructor/courses-management"),
    },
    {
      key: "3",
      icon: <ExceptionOutlined />,
      label: "Session",
      onClick: () => navigate("/instructor/sessions-management"),
    },
    {
      key: "4",
      icon: <BarChartOutlined />,
      label: "Lesson",
      onClick: () => navigate("/instructor/lessons-management"),
    },
    {
      key: "5",
      icon: <StarOutlined />,
      label: "Reviews",
      onClick: () => navigate("/instructor/reviews-management"),
    },
    {
      key: "6",
      icon: <DollarOutlined />,
      label: "Earning",
      onClick: () => navigate("/instructor/earning-management"),
    },
    {
      key: "7",
      icon: <WalletOutlined />,
      label: "Payout",
      onClick: () => navigate("/instructor/payout"),
      className: "hover:bg-amber-500 hover:text-white",
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

export default SiderInstructor;
