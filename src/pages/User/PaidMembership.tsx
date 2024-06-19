import React from "react";
import { Layout, Breadcrumb } from "antd";
import { useNavigate } from "react-router-dom";
import { AppFooter, AppHeader2, MembershipFaq, SelectMembership, SelectMembership2 } from "../../components";

const { Content, Footer } = Layout;

const PaidMembershipPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <AppHeader2 />

      <Content>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <div className="bg-white" style={{ padding: "8px 0" }}>
            <Breadcrumb style={{ margin: "16px 0", padding: "0 140px" }}>
              <Breadcrumb.Item>
                <span
                  onClick={() => navigate("/")}
                  style={{ cursor: "pointer" }}
                >
                  Home
                </span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <span
                  onClick={() => navigate("/paid-membership")}
                  style={{ cursor: "pointer" }}
                >
                  Paid Membership
                </span>
              </Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ margin: "16px 0", padding: "0 140px" }}>
              <h1 className="text-2xl font-semibold mb-4">Paid Membership</h1>
            </div>
          </div>
          <div className="flex-grow">
            <div className="max-w-7xl mx-auto p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 mt-10 gap-10">
                <div className="md:col-span-2 bg-white rounded-lg shadow-md p-4">
                  <SelectMembership /> {/* BabyPlan */}
                </div>
                <div className="md:col-span-2 bg-white rounded-lg shadow-md p-4">
                  <SelectMembership2 /> {/* BusinessPlan */}
                </div>
                <div className="md:col-span-4 flex flex-col justify-center items-center">
                  <h2 className="text-2xl p-4">Membership FAQ</h2>
                  <p className="text-lg text-gray-500">Wait, what about...</p>
                </div>
                <div className="md:col-span-4 bg-white rounded-lg shadow-md mb-8 p-4">
                  <MembershipFaq />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Content>

      <Footer
        style={{
          backgroundColor: "black",
          textAlign: "center",
          width: "100%",
          padding: "24px 0",
        }}
      >
        <AppFooter />
      </Footer>
    </Layout>
  );
};

export default PaidMembershipPage;
