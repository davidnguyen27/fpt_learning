import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Button, Dropdown, MenuProps, Space } from "antd";
import {
  ShoppingCartOutlined,
  MailOutlined,
  BellOutlined,
  ContactsOutlined,
  AreaChartOutlined,
  RetweetOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../app/context/AuthContext";
import "../../styles/header.css";
import "../../styles/sider.css";
import AppSider from "./AppSider";

const AppHeader: React.FC = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const storedUser: any = sessionStorage.getItem("user");
  const user = JSON.parse(storedUser);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleCreateCourseClick = () => {
    navigate("/instructor/courses-management/");
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
      navigate("/student-course-list-page");
    }
  };

  const handleShoppingCart = () => {
    if (user?.data.role === "student" || user?.data.role === "instructor") {
      navigate("/cart");
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

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      <div className="wrapper-50">
        <div className="styles-x-axis">
          <div className="menu-bar" onClick={toggleSidebar}>
            <MenuOutlined style={{ fontSize: "24px" }} />
          </div>
          <a href="/" className="logo-box">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/00/Fsalancuoi.png?fbclid=IwY2xjawEL70VleHRuA2FlbQIxMAABHSOH1DvZhDz6HyNm9B8B9vVnR5FTMc5fxIMyse-0EmMcywet3F9FpHImTg_aem_2GEmB71ukmiXD33DVhV5xw"
              alt="FSA Education"
            />
          </a>
          <div className="styles-x-axis search-box">
            <input
              style={{ width: "100%" }}
              type="text"
              placeholder="Search for courses, tutorials..."
              className="search-item"
            />
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
          </div>
        </div>
      </div>
      <div className="styles-x-axis w-1/2 justify-end gap-5">
        {user?.data.role === "instructor" ? (
          <Button
            type="primary"
            danger
            className="my-custom-button"
            onClick={handleCreateCourseClick}
          >
            Create new Course
          </Button>
        ) : null}
        {user ? (
          <>
            {user?.data.role === "student" && (
              <Badge>
                <ShoppingCartOutlined
                  className="text-xl cursor-pointer rounded-md bg-slate-200 transition-transform duration-300 hover:scale-105 hover:bg-slate-300"
                  onClick={handleShoppingCart}
                />
              </Badge>
            )}
            {user?.data.role === "instructor" && (
              <Badge>
                <ShoppingCartOutlined
                  className="text-xl cursor-pointer hover:text-blue-500 transition-colors duration-300"
                  onClick={handleShoppingCart}
                />
              </Badge>
            )}
            <Badge count={1}>
              <MailOutlined className="text-xl cursor-pointer rounded-md bg-slate-200 transition-transform duration-300 hover:scale-105 hover:bg-slate-300" />
            </Badge>
            <Badge count={1}>
              <BellOutlined className="text-xl cursor-pointer rounded-md bg-slate-200 transition-transform duration-300 hover:scale-105 hover:bg-slate-300" />
            </Badge>
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
          <div className="hide-on-mobile mr-4">
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
      <AppSider isVisible={isSidebarVisible} onClose={toggleSidebar} />
    </>
  );
};

export default AppHeader;
