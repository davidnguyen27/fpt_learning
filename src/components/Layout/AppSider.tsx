import React, { useState } from "react";
import { Divider, Menu } from "antd";
import { Footer } from "antd/es/layout/layout";
import SubMenu from "antd/es/menu/SubMenu";
import { useNavigate } from "react-router-dom";

const AppSider: React.FC<{ className?: string }> = () => {
  const navigate = useNavigate();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(["1"]);

  const onOpenChange = (keys: string[]) => {
    setOpenKeys(keys.length ? [keys[keys.length - 1]] : []);
  };

  const onSelect = ({ key }: { key: string }) => {
    setSelectedKeys([key]);
    navigateToPage(key);
  };

  const navigateToPage = (key: string) => {
    switch (key) {
      case "1":
        navigate("/");
        break;
      case "2":
        navigate("/about");
        break;
      case "9":
        navigate("/settings-page");
        break;
      case "10":
        navigate("/help-page");
        break;
      case "11":
        navigate("/report-page");
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex h-full flex-col">
      <Menu
        mode="inline"
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        onSelect={onSelect}
        className="flex-grow bg-slate-200 text-sm"
      >
        <Menu.Item
          className="hover:rounded-none hover:bg-[#c2410c] hover:text-white"
          key="1"
          icon={<i className="fa-solid fa-house"></i>}
        >
          Home
        </Menu.Item>
        <Menu.Item
          className="hover:rounded-none hover:bg-[#c2410c] hover:text-white"
          key="2"
          icon={<i className="fa-solid fa-address-card"></i>}
        >
          About
        </Menu.Item>
        <SubMenu
          key="sub1"
          icon={<i className="fa-solid fa-layer-group"></i>}
          title="Categories"
        >
          <Menu.Item
            className="hover:rounded-none hover:bg-[#ef4444] hover:text-white"
            key="3"
          >
            Web Development
          </Menu.Item>
          <Menu.Item
            className="hover:rounded-none hover:bg-[#ef4444] hover:text-white"
            key="4"
          >
            Data & Analytics
          </Menu.Item>
          <Menu.Item
            className="hover:rounded-none hover:bg-[#ef4444] hover:text-white"
            key="5"
          >
            Information Technology
          </Menu.Item>
          <Menu.Item
            className="hover:rounded-none hover:bg-[#ef4444] hover:text-white"
            key="6"
          >
            Marketing
          </Menu.Item>
          <Menu.Item
            className="hover:rounded-none hover:bg-[#ef4444] hover:text-white"
            key="7"
          >
            Office Productivity
          </Menu.Item>
          <Menu.Item
            className="hover:rounded-none hover:bg-[#ef4444] hover:text-white"
            key="8"
          >
            Business
          </Menu.Item>
        </SubMenu>
        <Menu.Item
          className="hover:rounded-none hover:bg-[#ef4444] hover:text-white"
          key="9"
          icon={<i className="fa-solid fa-gear"></i>}
        >
          Setting
        </Menu.Item>
        <Menu.Item
          className="hover:rounded-none hover:bg-[#ef4444] hover:text-white"
          key="10"
          icon={<i className="fa-solid fa-circle-question"></i>}
        >
          Help
        </Menu.Item>
        <Menu.Item
          className="hover:rounded-none hover:bg-[#ef4444] hover:text-white"
          key="11"
          icon={<i className="fa-solid fa-flag"></i>}
        >
          Report
        </Menu.Item>
      </Menu>
      <Divider />
      <Footer className="bg-slate-200 px-8 pb-4 pt-0 text-center">
        <span className="text-xs font-light">
          Copyright by FPT Education @2024
        </span>
      </Footer>
    </div>
  );
};

export default AppSider;
