import React, { useState } from "react";
import { AppFooter, AppHeader, AppSider } from "../../components";
import { Footer } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useSider } from "../../app/context/SiderContext";
import { Layout, Breadcrumb } from "antd";
import "../../styles/index.css";
import SettingNotify from "../../components/Settings/SettingNotify";
import SettingBilling from "../../components/Settings/SettingBilling";
import SettingClose from "../../components/Settings/SettingClose";
import SettingAccount from "../../components/Settings/SettingAccount";

const { Header, Content } = Layout;

const SettingsPage: React.FC = () => {
  const { collapsed } = useSider();
  const [activeTab, setActiveTab] = useState<string>("account");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <Layout className="flex h-screen w-screen flex-col">
      <Header className="header">
        <AppHeader />
      </Header>
      <Layout className="flex flex-1">
        <Sider
          className="sider"
          collapsed={collapsed}
          collapsedWidth={0}
          trigger={null}
          width={220}
        >
          <AppSider
            className={`transition-all duration-75 ${
              collapsed ? "w-0" : "w-64"
            }`}
          />
        </Sider>

        <Layout className="flex flex-1 flex-col">
          <Content className="flex-1 overflow-auto">
            <Content style={{ margin: "0 16px" }}>
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
                    className={`px-4 py-2 ${activeTab === "account" ? "bg-gray-200" : ""}`}
                    onClick={() => handleTabChange("account")}
                  >
                    Account Settings
                  </button>
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
            </Content>

            <Footer className="footer mt-auto" style={{ marginBottom: "0px" }}>
              <AppFooter />
            </Footer>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default SettingsPage;
