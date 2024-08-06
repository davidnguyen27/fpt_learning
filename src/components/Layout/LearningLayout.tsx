import { Layout } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import AppFooter from "./AppFooter";

interface MainLayoutProps {
  children: React.ReactNode;
}

const LearningLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Layout className="flex h-screen w-screen flex-col">
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

export default LearningLayout;
