import { Avatar, Menu, Switch, Layout, Dropdown } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import "../../styles/header.css";
const { Header } = Layout;

const AppHeader2: React.FC = () => {
  const navigate = useNavigate();
  const [nightMode, setNightMode] = useState(false);

  const userMenu = (
    <Menu>
      <Menu.Item key="user-info" disabled>
        <div className="user-menu">
          <Avatar src="https://via.placeholder.com/40" />{" "}
          {/* Replace with actual avatar URL */}
          <div style={{ marginLeft: 10 }}>
            <div>
              <strong>John Doe</strong>
            </div>
            <div>johndoe@example.com</div>
          </div>
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="view-profile" onClick={() => navigate("/profile")}>
        View Profile
      </Menu.Item>
      <Menu.Item key="toggle-night-mode">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Night Mode</span>
          <Switch
            checked={nightMode}
            onChange={() => setNightMode(!nightMode)}
          />
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );

  return (
    <Header className={`header-2`}>
      <button
        className="block flex h-12 items-center justify-center rounded bg-[#d97706] transition hover:bg-black hover:text-white"
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
      <Dropdown overlay={userMenu} trigger={["click"]}>
        <UserOutlined className="user-logo" />
      </Dropdown>
    </Header>
  );
};

export default AppHeader2;
