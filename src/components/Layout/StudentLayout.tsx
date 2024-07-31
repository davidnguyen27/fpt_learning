import React from "react";
import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";
import { useSelector } from "react-redux";
import { RootState } from "../../app/redux/store";
import Loading from "../Loading/loading";

interface MainLayoutProps {
  children: React.ReactNode;
}

const StudentLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  return (
    <Layout className="flex h-screen w-screen flex-col">
      {isLoading && <Loading />}
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
