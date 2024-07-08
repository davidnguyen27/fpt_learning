import React from "react";
import { Row, Col, Card } from "antd";
import {
  ContactsOutlined,
  GlobalOutlined,
  MobileOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import MainLayout from "../../components/Layout/MainLayout";

const AboutPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="bg-[#1f2937] py-10 text-center text-white">
        <h1 className="mb-4 text-2xl font-bold">
          Improving Lives Through Learning
        </h1>
        <p className="text-base">On Course, you have access to:</p>
      </div>
      <div className="bg-white py-16">
        <div className="container mx-auto">
          <h2 className="mb-8 text-center text-2xl font-bold">Our Features</h2>
          <Row gutter={16} justify="center">
            {[
              {
                icon: <MobileOutlined />,
                title: "Mobile learning",
                description:
                  "Quisque nec volutpat sem. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
              },
              {
                icon: <TeamOutlined />,
                title: "Academic & Technical Support",
                description:
                  "Quisque nec volutpat sem. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
              },
              {
                icon: <ContactsOutlined />,
                title: "Shareable Certificates",
                description:
                  "Quisque nec volutpat sem. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
              },
              {
                icon: <GlobalOutlined />,
                title: "An Inclusive Experience",
                description:
                  "Quisque nec volutpat sem. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
              },
            ].map((feature, index) => (
              <Col key={index} xs={24} md={12} lg={6} className="mb-8">
                <Card className="border-0 text-center shadow-none">
                  <div className="mx-auto mb-4 text-3xl">{feature.icon}</div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p>{feature.description}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto">
          <h2 className="mb-8 text-center text-2xl font-bold">Our Story</h2>
          <Row gutter={16}>
            <Col xs={24} md={12} lg={8} className="mb-8">
              <img
                src="/public/image/drawing-tablet.png"
                alt="Our Story"
                className="w-full"
              />
            </Col>
            <Col xs={24} md={12} lg={16}>
              <p className="text-lg leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                consectetur vel dolor id ultrices. Proin a magna at mi pretium
                pulvinar in eu enim. Nulla vel lacus lectus. Donec at venenatis
                nisl. Curabitur volutpat tincidunt lorem, ac vulputate metus.
                Donec eget semper leo, non tincidunt ligula. In hac habitasse
                platea dictumst. Nullam mollis justo at orci placerat, id
                vehicula metus gravida. Phasellus non turpis a felis ullamcorper
                scelerisque. Sed id convallis mi. Curabitur sit amet elit eget
                diam aliquet malesuada. Pellentesque a erat vitae quam cursus
                dictum non et quam.
              </p>
            </Col>
          </Row>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutPage;
