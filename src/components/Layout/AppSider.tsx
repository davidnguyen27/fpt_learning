import { Divider, Menu } from "antd";
import { Footer } from "antd/es/layout/layout";
import SubMenu from "antd/es/menu/SubMenu";
import { useNavigate } from "react-router-dom";

const AppSider: React.FC<{ className?: string }> = () => {
  const navigate = useNavigate();

  return (
    <>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        className="bg-slate-200 text-sm"
      >
        <Menu.Item
          className="hover:rounded-none hover:bg-amber-500 hover:text-black"
          key="1"
          icon={<i className="fa-solid fa-house"></i>}
          onClick={() => navigate("/")}
        >
          Home
        </Menu.Item>
        <Menu.Item
          className="hover:rounded-none hover:bg-amber-500 hover:text-black"
          key="2"
          icon={<i className="fa-solid fa-address-card"></i>}
          onClick={() => navigate("/about")}
        >
          About
        </Menu.Item>
        <SubMenu
          key="sub1"
          icon={<i className="fa-solid fa-layer-group"></i>}
          title="Categories"
        >
          <Menu.Item
            className="hover:rounded-none hover:bg-amber-500 hover:text-black"
            key="3"
          >
            Web Development
          </Menu.Item>
          <Menu.Item
            className="hover:rounded-none hover:bg-amber-500 hover:text-black"
            key="4"
          >
            Data & Analytics
          </Menu.Item>
          <Menu.Item
            className="hover:rounded-none hover:bg-amber-500 hover:text-black"
            key="5"
          >
            Information Technology
          </Menu.Item>
          <Menu.Item
            className="hover:rounded-none hover:bg-amber-500 hover:text-black"
            key="6"
          >
            Marketing
          </Menu.Item>
          <Menu.Item
            className="hover:rounded-none hover:bg-amber-500 hover:text-black"
            key="7"
          >
            Office Productivity
          </Menu.Item>
          <Menu.Item
            className="hover:rounded-none hover:bg-amber-500 hover:text-black"
            key="8"
          >
            Business
          </Menu.Item>
        </SubMenu>
        <Menu.Item
          className="hover:rounded-none hover:bg-amber-500 hover:text-black"
          key="9"
          icon={<i className="fa-solid fa-gear"></i>}
          onClick={() => navigate("/settings-page")}
        >
          Setting
        </Menu.Item>
        <Menu.Item
          className="hover:rounded-none hover:bg-amber-500 hover:text-black"
          key="10"
          icon={<i className="fa-solid fa-circle-question"></i>}
          onClick={() => navigate("/help-page")}
        >
          Help
        </Menu.Item>
        <Menu.Item
          className="hover:rounded-none hover:bg-amber-500 hover:text-black"
          key="11"
          icon={<i className="fa-solid fa-flag"></i>}
          onClick={() => navigate("/report-page")}
        >
          Report
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

export default AppSider;
