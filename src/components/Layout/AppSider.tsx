import React, { useState } from "react";
import { Divider, Menu, Button, Drawer } from "antd";
import { Footer } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import {
  AuditOutlined,
  BarsOutlined,
  CloseOutlined,
  FlagOutlined,
  HomeOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  SketchOutlined,
} from "@ant-design/icons";

interface AppSiderProps {
  isVisible: boolean;
  onClose: () => void;
}

const AppSider: React.FC<AppSiderProps> = ({ isVisible, onClose }) => {
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
      case "3":
        navigate("/category/66827468b5436c3f43c703e7");
        break;
      case "4":
        navigate("/category/668e2f4bf2c243ced095c6c0");
        break;
      case "5":
        navigate("/category/66840803c2ef7156100c3f61");
        break;
      case "6":
        navigate("/category/669f294e396c0261a73f5a7a");
        break;
      case "7":
        navigate("/category/668f6c0320c527aff59b0f8b");
        break;
      case "8":
        navigate("/category/668b4abf03350733f0080b9a");
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
      case "12":
        navigate("/blog");
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
          label: "Information Technology",
        },
        {
          key: "5",
          label: "Business",
        },
        {
          key: "6",
          label: "Music",
        },
        {
          key: "7",
          label: "Marketing",
        },
        {
          key: "8",
          label: "Graphic Design",
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
    {
      key: "12",
      icon: <SketchOutlined />,
      label: "Blog",
    },
  ];

  return (
    <Drawer
      placement="left"
      onClose={onClose}
      visible={isVisible}
      width={280}
      bodyStyle={{ padding: 0 }}
      title="Menu"
      closeIcon={<CloseOutlined />}
    >
      <div className="flex h-full flex-col">
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          onSelect={onSelect}
          className="flex-grow"
          items={items}
        />
        <div className="mobile-buttons px-4 py-6">
          <Divider className="my-4" />
          <div className="space-y-3">
            <Button
              className="w-full"
              type="primary"
              onClick={() => navigate("/sign-in")}
            >
              Sign In
            </Button>
            <Button className="w-full" onClick={() => navigate("/sign-up")}>
              Sign Up
            </Button>
            <Button
              className="w-full"
              type="dashed"
              onClick={() => navigate("/sign-up-instructor")}
            >
              Become an Instructor
            </Button>
          </div>
        </div>
        <Footer className="bg-gray-100 px-4 py-3 text-center">
          <span className="text-xs text-gray-600">
            Copyright © FPT Education 2024
          </span>
        </Footer>
      </div>
    </Drawer>
  );
};

export default AppSider;
