import React from "react";
import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useSelector } from "react-redux";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import { RootState } from "../../app/redux/store";
import Loading from "../Loading/loading";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  return (
    <Layout className="flex h-screen w-screen flex-col">
      {isLoading && <Loading />}
      <Header className="header">
        <AppHeader />
      </Header>
      <Layout className="flex flex-1 overflow-y-auto">
        <Layout className="flex flex-1 flex-col">
          <Content className="flex-1 overflow-y-auto">
            <div className="p-4">{children}</div>
            <Footer className="footer">
              <AppFooter />
            </Footer>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
