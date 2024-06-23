import React, { useState } from "react";
import { PersonalInfo, SideBar } from "../../components";
import SettingAccount from "../../components/Settings/SettingAccount";

const StudentSettingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("personalInfo");

  return (
    <div className="student-setting flex h-screen">
      <div className="sider w-1/4 bg-gray-200 p-4">
        <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className="content w-3/4 p-4">
        {activeTab === "personalInfo" && <PersonalInfo />}
        {activeTab === "settingAccount" && <SettingAccount />}
      </div>
    </div>
  );
};

export default StudentSettingPage;
