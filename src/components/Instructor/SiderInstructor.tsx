import { AppstoreOutlined, BarChartOutlined, DollarOutlined, ExceptionOutlined, ReadOutlined, StarOutlined, WalletOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

const SiderInstructor: React.FC<{ className?: string }> = () => {
  const navigate = useNavigate();

  return (
    <>
      <Menu
        mode="inline"
        // defaultSelectedKeys={["1"]}
        // defaultOpenKeys={["sub1"]}
        className="bg-slate-200"
      >
        <Menu.Item
          className="hover:bg-red-500 hover:text-white"
          key="1"
          icon={<AppstoreOutlined />}
          onClick={() => navigate("/instructor/dashboard")}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          className="hover:bg-red-500 hover:text-white"
          key="2"
          icon={<ReadOutlined />}
          onClick={() => navigate("/instructor/courses-management")}
        >
          Courses
        </Menu.Item>
        <Menu.Item
          className="hover:bg-red-500 hover:text-white"
          key="3"
          icon={<BarChartOutlined />}
          onClick={() => navigate("/instructor/lessons-management")}
        >
          Lesson
        </Menu.Item>
        <Menu.Item
          className="hover:bg-red-500 hover:text-white"
          key="4"
          icon={<ExceptionOutlined />}
          onClick={() => navigate("/instructor/sessions-management")}
        >
          Session
        </Menu.Item>
        <Menu.Item
          className="hover:bg-red-500 hover:text-white"
          key="5"
          icon={<StarOutlined />}
        >
          Reviews
        </Menu.Item>
        <Menu.Item
          className="hover:bg-red-500 hover:text-white"
          key="6"
          onClick={() => navigate("/instructor/earning-management")}
          icon={<DollarOutlined />}
        >
          Earning
        </Menu.Item>
        <Menu.Item
          className="hover:bg-amber-500 hover:text-white"
          key="7"
          icon={<WalletOutlined />}
        >
          Payout
        </Menu.Item>
      </Menu>
    </>
  );
};

export default SiderInstructor;
