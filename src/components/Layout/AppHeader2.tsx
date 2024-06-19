import { Avatar, Menu, Switch, Layout, Button, Dropdown } from "antd";
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
    <Header className={`header-2 ${nightMode ? "night-mode" : ""}`}>
      <Button
        className={`btn-header2 ${nightMode ? "night-mode" : ""}`}
        onClick={() => navigate("/")}
      >
        Back To Homepage
      </Button>
      <img
        className="logo-header2"
        src="/logo/Fstudy123.png"
        alt="F-Study"
        onClick={() => navigate("/")}
      />
      <Dropdown overlay={userMenu} trigger={["click"]}>
        <UserOutlined className="user-logo" />
      </Dropdown>
    </Header>
  );
};

export default AppHeader2;
