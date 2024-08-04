import React from "react";
import { Layout, Dropdown, Space, MenuProps, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../app/context/AuthContext";
import {
  AreaChartOutlined,
  ContactsOutlined,
  LogoutOutlined,
  RetweetOutlined,
} from "@ant-design/icons";
import "../../styles/appHeader2.css";

const { Header } = Layout;

const AppHeader2: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleView = () => {
    if (user?.data.role === "admin") {
      navigate("/admin-profile-page");
    } else if (user?.data.role === "instructor") {
      navigate("/user-profile-page");
    } else {
      navigate("/user-profile-page");
    }
  };

  const handleManagement = () => {
    if (user?.data.role === "admin") {
      navigate("/admin/dashboard");
    } else if (user?.data.role === "instructor") {
      navigate("/instructor/dashboard");
    } else {
      navigate("/student/dashboard");
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <a onClick={handleView}>
          <ContactsOutlined /> Profile
        </a>
      ),
    },
    {
      key: "1",
      label: (
        <a onClick={handleManagement}>
          <AreaChartOutlined />{" "}
          {user?.data.role === "admin" || "instructor"
            ? "Dashboard"
            : "My Course"}
        </a>
      ),
    },
    {
      key: "2",
      label: <a href="/paid-membership">Paid Memberships</a>,
    },
    {
      key: "3",
      label: <a href="/settings">Setting</a>,
    },
    {
      key: "4",
      label: <a href="/help">Help</a>,
    },
    {
      key: "5",
      label: (
        <a href="/user/change-password">
          <RetweetOutlined /> Change Password
        </a>
      ),
    },
    {
      key: "6",
      label: (
        <a onClick={handleLogout}>
          <LogoutOutlined /> Logout
        </a>
      ),
    },
  ];

  return (
    <Header className="header-2">
      <div className="header-content">
        <Button
          type="primary"
          danger
          className="flex w-36"
          onClick={() => navigate("/")}
        >
          <p className="text-[14px]">Back to homepage</p>
        </Button>

        <img
          className="logo-header2"
          src="https://upload.wikimedia.org/wikipedia/commons/0/00/Fsalancuoi.png?fbclid=IwY2xjawEL70VleHRuA2FlbQIxMAABHSOH1DvZhDz6HyNm9B8B9vVnR5FTMc5fxIMyse-0EmMcywet3F9FpHImTg_aem_2GEmB71ukmiXD33DVhV5xw"
          alt="FSA Education"
          onClick={() => navigate("/")}
        />

        <div className="header-actions">
          {user ? (
            <>
              <Dropdown menu={{ items }}>
                <a className="mr-9 flex" onClick={(e) => e.preventDefault()}>
                  <Space>
                    <img
                      src={user.data.avatar}
                      className="h-12 w-12 rounded-full"
                      alt=""
                    />
                  </Space>
                </a>
              </Dropdown>
            </>
          ) : (
            <div className="header-buttons">
              <Button
                type="primary"
                className="mr-4 bg-red-500"
                danger
                onClick={() => navigate("/sign-in")}
              >
                Sign In
              </Button>
              <Button
                className="mr-4"
                style={{
                  backgroundColor: "#f3f4f6",
                  color: "black",
                  borderColor: "black",
                }}
                type="primary"
                danger
                onClick={() => navigate("/sign-up")}
              >
                Sign Up
              </Button>
              <Button
                className="mr-4 border-slate-900 bg-slate-900 text-white"
                type="primary"
                onClick={() => navigate("/sign-up-instructor")}
              >
                Become an Instructor
              </Button>
            </div>
          )}
        </div>
      </div>
    </Header>
  );
};

export default AppHeader2;
