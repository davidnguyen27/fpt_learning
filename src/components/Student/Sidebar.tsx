import React from "react";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div
        className="logo"
        onClick={handleLogoClick}
        style={{ cursor: "pointer" }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/FPT_Education_logo.svg/2560px-FPT_Education_logo.svg.png"
          alt="FPT Education"
        />
      </div>
      <div className="menu">
        <div
          className={`menu-item ${activeTab === "personalInfo" ? "active" : ""}`}
          onClick={() => setActiveTab("personalInfo")}
        >
          Personal Infomation
        </div>
        <div
          className={`menu-item ${activeTab === "settingAccount" ? "active" : ""}`}
          onClick={() => setActiveTab("settingAccount")}
        >
          Account Setting
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
