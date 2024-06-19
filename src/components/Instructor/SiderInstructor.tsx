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
          className="hover:rounded-none hover:bg-amber-500 hover:text-black"
          key="1"
          icon={<i className="fa-solid fa-chart-line"></i>}
          onClick={() => navigate("/instructor-dashboard")}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          className="hover:rounded-none hover:bg-amber-500 hover:text-black"
          key="2"
          icon={<i className="fa-solid fa-book-open"></i>}
          onClick={() => navigate("/courses-management")}
        >
          Courses
        </Menu.Item>
        <Menu.Item
          className="hover:rounded-none hover:bg-amber-500 hover:text-black"
          key="3"
          icon={<i className="fa-solid fa-star"></i>}
        >
          Reviews
        </Menu.Item>
        <Menu.Item
          className="hover:rounded-none hover:bg-amber-500 hover:text-black"
          key="4"
          icon={<i className="fa-solid fa-dollar-sign"></i>}
          onClick={() => navigate("/user-management")}
        >
          Earning
        </Menu.Item>
        <Menu.Item
          className="hover:rounded-none hover:bg-amber-500 hover:text-black"
          key="5"
          icon={<i className="fa-solid fa-wallet"></i>}
        >
          Payout
        </Menu.Item>
      </Menu>
    </>
  );
};

export default SiderInstructor;
