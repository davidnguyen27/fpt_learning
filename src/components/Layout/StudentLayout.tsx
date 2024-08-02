import React from "react";
import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";
import AppSider from "./AppSider";

interface MainLayoutProps {
  children: React.ReactNode;
}

const StudentLayout: React.FC<MainLayoutProps> = ({ children }) => {

  return (
    <Layout className="flex h-screen w-screen flex-col">
      <AppSider isVisible={false} onClose={function (): void {
        throw new Error("Function not implemented.");
      } }/>
      <Header className="header">
        <AppHeader />
      </Header>
      <Layout className="flex flex-1 overflow-y-auto">
        <Layout className="flex flex-1 flex-col">
          <Content className="mt-3 flex-1 overflow-y-auto">
            <div className="p-4">{children}</div>
            <Footer className="footer mt-14">
              <AppFooter />
            </Footer>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default StudentLayout;
