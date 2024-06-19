import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useSider } from "../../app/context/SiderContext";
import Achievements from "../../components/User/Achievements";
import {
  AppFooter,
  AppHeader,
  AppSider,
  CarouselCourse,
  CarouselInstructor,
  CarouselReview,
  CarouselSeller,
} from "../../components";

const HomePage: React.FC = () => {
  const siderContext = useSider();

  const { collapsed } = siderContext;

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
          width={230}
        >
          <AppSider
            className={`transition-all duration-75 ${collapsed ? "w-0" : "w-64"}`}
          />
        </Sider>
        <Layout className="flex flex-1 flex-col">
          <Content className="flex-1 overflow-auto">
            <div className="p-8">
              <section>
                <div className="mb-5 flex w-full justify-between">
                  <h1 className="text-xl font-bold">Newest Courses</h1>
                  <a href="#" className="font-light hover:text-amber-600">
                    See all
                  </a>
                </div>
                <CarouselCourse />
              </section>
              <section className="mt-10">
                <div className="mb-5 flex w-full justify-between">
                  <h1 className="text-xl font-bold">Best Seller</h1>
                  <a href="#" className="font-light hover:text-amber-600">
                    See all
                  </a>
                </div>
                <CarouselSeller />
              </section>
              <Achievements />
              <section>
                <div className="mb-5 flex w-full justify-between">
                  <h1 className="text-xl font-bold">Popular Instructors</h1>
                  <a href="#" className="font-light hover:text-amber-600">
                    See all
                  </a>
                </div>
                <CarouselInstructor />
              </section>
              <section className="my-10">
                <h1 className="mb-5 text-xl font-bold">
                  What Our Student Have Today
                </h1>
                <CarouselReview />
              </section>
            </div>
            <Footer className="footer mt-auto">
              <AppFooter />
            </Footer>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default HomePage;
