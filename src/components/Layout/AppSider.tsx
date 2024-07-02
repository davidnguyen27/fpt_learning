import React, { useState } from "react";
import { Divider, Menu } from "antd";
import { Footer } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import {
  AuditOutlined,
  BarsOutlined,
  FlagOutlined,
  HomeOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";

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

  const items = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: "Home",
    },
    {
      key: "2",
      icon: <AuditOutlined />,
      label: "About",
    },
    {
      key: "sub1",
      icon: <BarsOutlined />,
      label: "Categories",
      children: [
        {
          key: "3",
          label: "Web Development",
        },
        {
          key: "4",
          label: "Data & Analytics",
        },
        {
          key: "5",
          label: "Information Technology",
        },
        {
          key: "6",
          label: "Marketing",
        },
        {
          key: "7",
          label: "Office Productivity",
        },
        {
          key: "8",
          label: "Business",
        },
      ],
    },
    {
      key: "9",
      icon: <SettingOutlined />,
      label: "Setting",
    },
    {
      key: "10",
      icon: <QuestionCircleOutlined />,
      label: "Help",
    },
    {
      key: "11",
      icon: <FlagOutlined />,
      label: "Report",
    },
  ];

  return (
    <div className="flex h-full flex-col">
      <Menu
        mode="inline"
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        onSelect={onSelect}
        className="flex-grow bg-slate-200 text-sm"
        items={items}
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

export default AppSider;
