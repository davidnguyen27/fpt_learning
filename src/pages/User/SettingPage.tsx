import React, { useState } from "react";
import { Breadcrumb } from "antd";
import "../../styles/index.css";
import SettingNotify from "../../components/Settings/SettingNotify";
import SettingBilling from "../../components/Settings/SettingBilling";
import SettingClose from "../../components/Settings/SettingClose";
import SettingAccount from "../../components/Settings/SettingAccount";
import MainLayout from "../../components/Layout/MainLayout";

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("privacy");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <MainLayout>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Settings</Breadcrumb.Item>
        <Breadcrumb.Item>{`${
          activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
        } Settings`}</Breadcrumb.Item>
      </Breadcrumb>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        <div className="flex justify-center border-b-2 border-gray-200 font-semibold">
          <button
            type="button"
            className={`px-4 py-2 ${activeTab === "privacy" ? "bg-gray-200" : ""}`}
            onClick={() => handleTabChange("privacy")}
          >
            Notify and Privacy
          </button>
          <button
            type="button"
            className={`px-4 py-2 ${activeTab === "billing" ? "bg-gray-200" : ""}`}
            onClick={() => handleTabChange("billing")}
          >
            Billing and Payment
          </button>
          <button
            type="button"
            className={`px-4 py-2 ${activeTab === "closeAccount" ? "bg-gray-200" : ""}`}
            onClick={() => handleTabChange("closeAccount")}
          >
            Close Account
          </button>
        </div>
        <div
          id="accountSettings"
          style={{
            display: activeTab === "account" ? "block" : "none",
          }}
        >
          <SettingAccount />
        </div>
        <div
          id="privacySettings"
          style={{
            display: activeTab === "privacy" ? "block" : "none",
          }}
        >
          <SettingNotify />
        </div>
        <div
          id="billingSettings"
          style={{
            display: activeTab === "billing" ? "block" : "none",
          }}
        >
          <SettingBilling />
        </div>
        <div
          id="closeAccountSettings"
          style={{
            display: activeTab === "closeAccount" ? "block" : "none",
          }}
        >
          <SettingClose />
        </div>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
