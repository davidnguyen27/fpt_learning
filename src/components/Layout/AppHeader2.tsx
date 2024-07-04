import { Layout, Dropdown, Space, MenuProps, Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/header.css";
import { useAuth } from "../../app/context/AuthContext";
const { Header } = Layout;

const AppHeader2: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleView = () => {
    if (user?.role === "admin") {
      navigate("/admin-profile-page");
    } else if (user?.role === "instructor") {
      navigate("/instructor-profile-page");
    } else {
      navigate("/student-profile-page");
    }
  };

  const handleManagement = () => {
    if (user?.role === "admin") {
      navigate("/admin-dashboard");
    } else if (user?.role === "instructor") {
      navigate("/instructor-course-list-page");
    } else {
      navigate("/student-course-list-page");
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "0",
      label: <a onClick={handleView}>Profile</a>,
    },
    {
      key: "1",
      label: (
        <a onClick={handleManagement}>
          {user?.role === "admin" ? "Dashboard" : "My Course"}
        </a>
      ),
    },
    {
      key: "2",
      label: <a href="/paid-memberships">Paid Memberships</a>,
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
      label: <a href="/feedback">Send Feedback</a>,
    },
    {
      label: <a onClick={handleLogout}>Logout</a>,
      key: "6",
    },
  ];

  return (
    <Header className={`header-2`}>
      <button
        className="flex h-8 w-40 items-center justify-center rounded bg-[#ef4444] text-white transition hover:bg-black hover:text-white"
        onClick={() => navigate("/")}
      >
        Back to homepage
      </button>

      <img
        className="logo-header2"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/FPT_Education_logo.svg/2560px-FPT_Education_logo.svg.png"
        alt="F-Edu"
        onClick={() => navigate("/")}
      />
      {user ? (
        <Dropdown menu={{ items }}>
          <a className="mr-9 flex" onClick={(e) => e.preventDefault()}>
            <Space>
              <img
                src={user.avatar}
                className="h-12 w-12 rounded-full"
                alt=""
              />
            </Space>
          </a>
        </Dropdown>
      ) : (
        <>
          <Button
            type="primary"
            className="bg-[#ef4444]"
            danger
            onClick={() => navigate("/sign-in")}
          >
            Sign In
          </Button>
          <Button
            className="mr-4 bg-[#ef4444]"
            type="primary"
            danger
            onClick={() => navigate("/sign-up")}
          >
            Sign Up
          </Button>
        </>
      )}
    </Header>
  );
};

export default AppHeader2;
