import React from "react";
import { Layout, Row, Col, Card } from "antd";

import { useSider } from "../../app/context/SiderContext";
import { AppFooter, AppHeader, AppSider } from "../../components";

const { Header, Content, Footer, Sider } = Layout;

const AboutPage: React.FC = () => {
  const { collapsed } = useSider();

  return (
    <Layout className="flex h-screen w-screen flex-col">
      <Header className="header">
        <AppHeader />
      </Header>
      <Layout className="flex flex-1 overflow-y-auto">
        <Sider
          className="sider"
          collapsed={collapsed}
          collapsedWidth={0}
          trigger={null}
          width={230}
        >
          <AppSider
            className={`transition-all duration-75 ${collapsed ? "w-0" : "w-64"}`}
          />
        </Sider>
        <Layout>
          <Content className="flex-1 overflow-y-auto p-4">
            <div className="bg-gray-100 py-16 text-center">
              <h1 className="mb-4 text-4xl font-bold">
                Improving Lives Through Learning
              </h1>
              <p className="text-lg">On Course, you have access to:</p>
            </div>
            <div className="bg-white py-16">
              <div className="container mx-auto">
                <h2 className="mb-8 text-center text-2xl font-bold">
                  Our Features
                </h2>
                <Row gutter={16} justify="center">
                  {[
                    {
                      imgSrc:
                        "https://m.yodycdn.com/blog/anh-dai-dien-hai-yodyvn.jpg",
                      title: "Mobile learning",
                      description:
                        "Quisque nec volutpat sem. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
                    },
                    {
                      imgSrc:
                        "https://m.yodycdn.com/blog/anh-dai-dien-hai-yodyvn.jpg",
                      title: "Academic & Technical Support",
                      description:
                        "Quisque nec volutpat sem. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
                    },
                    {
                      imgSrc:
                        "https://m.yodycdn.com/blog/anh-dai-dien-hai-yodyvn.jpg",
                      title: "Shareable Certificates",
                      description:
                        "Quisque nec volutpat sem. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
                    },
                    {
                      imgSrc:
                        "https://m.yodycdn.com/blog/anh-dai-dien-hai-yodyvn.jpg",
                      title: "An Inclusive Experience",
                      description:
                        "Quisque nec volutpat sem. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
                    },
                  ].map((feature, index) => (
                    <Col key={index} xs={24} md={12} lg={6} className="mb-8">
                      <Card className="border-0 text-center shadow-none">
                        <img
                          src={feature.imgSrc}
                          alt={feature.title}
                          className="mx-auto mb-4"
                        />
                        <h3 className="text-xl font-semibold">
                          {feature.title}
                        </h3>
                        <p>{feature.description}</p>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
            <div className="bg-gray-100 py-16">
              <div className="container mx-auto">
                <h2 className="mb-8 text-center text-2xl font-bold">
                  Our Story
                </h2>
                <Row gutter={16}>
                  <Col xs={24} md={12} lg={8} className="mb-8">
                    <img
                      src="https://photo2.tinhte.vn/data/attachment-files/2020/02/4901996_cover.jpg"
                      alt="Our Story"
                      className="w-full"
                    />
                  </Col>
                  <Col xs={24} md={12} lg={16}>
                    <p className="text-lg leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed consectetur vel dolor id ultrices. Proin a magna at mi
                      pretium pulvinar in eu enim. Nulla vel lacus lectus. Donec
                      at venenatis nisl. Curabitur volutpat tincidunt lorem, ac
                      vulputate metus. Donec eget semper leo, non tincidunt
                      ligula. In hac habitasse platea dictumst. Nullam mollis
                      justo at orci placerat, id vehicula metus gravida.
                      Phasellus non turpis a felis ullamcorper scelerisque. Sed
                      id convallis mi. Curabitur sit amet elit eget diam aliquet
                      malesuada. Pellentesque a erat vitae quam cursus dictum
                      non et quam.
                    </p>
                  </Col>
                </Row>
              </div>
            </div>
            <Footer className="footer">
              <AppFooter />
            </Footer>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AboutPage;
