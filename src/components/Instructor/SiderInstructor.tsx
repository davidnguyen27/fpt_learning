import { BarChartOutlined, ExceptionOutlined } from "@ant-design/icons";
import { Divider, Menu } from "antd";
import { Footer } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";

const SiderInstructor: React.FC<{ className?: string }> = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col">
      <Menu
        mode="inline"
        // defaultSelectedKeys={["1"]}
        // defaultOpenKeys={["sub1"]}
        className="flex-grow bg-slate-200"
      >
        <Menu.Item
          className="hover:rounded-none hover:bg-amber-500 hover:text-black"
          key="1"
          icon={<i className="fa-solid fa-chart-line"></i>}
          onClick={() => navigate("/instructor/dashboard")}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          className="hover:rounded-none hover:bg-amber-500 hover:text-black"
          key="2"
          icon={<i className="fa-solid fa-book-open"></i>}
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
          className="hover:rounded-none hover:bg-amber-500 hover:text-black"
          key="5"
          icon={<i className="fa-solid fa-star"></i>}
        >
          Reviews
        </Menu.Item>
        <Menu.Item
          className="hover:rounded-none hover:bg-amber-500 hover:text-black"
          key="6"
          icon={<i className="fa-solid fa-dollar-sign"></i>}
          onClick={() => navigate("/instructor/earning-management")}
        >
          Earning
        </Menu.Item>
        <Menu.Item
          className="hover:rounded-none hover:bg-amber-500 hover:text-black"
          key="7"
          icon={<i className="fa-solid fa-wallet"></i>}
        >
          Payout
        </Menu.Item>
      </Menu>
      <Divider />
      <Footer className="bg-slate-200 px-8 py-3 text-center">
        <span className="text-xs font-light">
          Copyright by FPT Education @2024
        </span>
      </Footer>
    </div>
  );
};

export default SiderInstructor;
