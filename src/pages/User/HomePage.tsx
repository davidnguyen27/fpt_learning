import Achievements from "../../components/User/Achievements";
import {
  CarouselInstructor,
  CarouselReview,
  ListCourse,
} from "../../components";
import MainLayout from "../../components/Layout/MainLayout";
import ImageSlider from "../../components/User/ImageSlide";
import "../../styles/homepage.css";

const HomePage: React.FC = () => {
  const slides = [
    {
      url: "https://fschool.fpt.edu.vn/wp-content/uploads/2024/07/2anh-bia-bai-dang-web.jpg",
      title: "beach",
    },
    {
      url: "https://fschool.fpt.edu.vn/wp-content/uploads/2024/07/anh-bia-bai-dang-web-2.jpg",
      title: "boat",
    },
    {
      url: "https://fschool.fpt.edu.vn/wp-content/uploads/2024/06/433527687_848563273952132_4550113571092770589_n.jpg",
      title: "forest",
    },
    {
      url: "https://fschool.fpt.edu.vn/wp-content/uploads/2022/04/ANH_4165-2048x1365.png",
      title: "city",
    },
    {
      url: "https://fschool.fpt.edu.vn/wp-content/uploads/2022/04/Image3.png",
      title: "italy",
    },
  ];
  const containerStyles: React.CSSProperties = {
    width: "100%",
    height: "400px",
    margin: "0 auto",
  };
  return (
    <MainLayout>
      <div className="image-slider-container" style={containerStyles}>
        <ImageSlider slides={slides} />
      </div>
      <section className="mt-10">
        <div className="mb-5 flex w-full justify-between">
          <h1 className="text-xl font-bold">Web Development</h1>
          <a href="#" className="font-light hover:text-amber-600">
            See all
          </a>
        </div>
        <ListCourse category_id="66827468b5436c3f43c703e7" />
      </section>
      <section className="mt-10">
        <div className="mb-5 flex w-full justify-between">
          <h1 className="text-xl font-bold">Information Technology</h1>
          <a href="#" className="font-light hover:text-amber-600">
            See all
          </a>
        </div>
        <ListCourse category_id="668e2f4bf2c243ced095c6c0" />
      </section>
      <section className="mt-10">
        <div className="mb-5 flex w-full justify-between">
          <h1 className="text-xl font-bold">Business</h1>
          <a href="#" className="font-light hover:text-amber-600">
            See all
          </a>
        </div>
        <ListCourse category_id="66840803c2ef7156100c3f61" />
      </section>
      <section className="mt-10">
        <div className="mb-5 flex w-full justify-between">
          <h1 className="text-xl font-bold">Music</h1>
          <a href="#" className="font-light hover:text-amber-600">
            See all
          </a>
        </div>
        <ListCourse category_id="669f294e396c0261a73f5a7a" />
      </section>
      <section className="mt-10">
        <div className="mb-5 flex w-full justify-between">
          <h1 className="text-xl font-bold">Marketing</h1>
          <a href="#" className="font-light hover:text-amber-600">
            See all
          </a>
        </div>
        <ListCourse category_id="668f6c0320c527aff59b0f8b" />
      </section>
      <section className="mt-10">
        <div className="mb-5 flex w-full justify-between">
          <h1 className="text-xl font-bold">Graphic Design</h1>
          <a href="#" className="font-light hover:text-amber-600">
            See all
          </a>
        </div>
        <ListCourse category_id="668b4abf03350733f0080b9a" />
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
        <h1 className="mb-5 text-xl font-bold">What Our Student Have Today</h1>
        <CarouselReview />
      </section>
    </MainLayout>
  );
};

export default HomePage;
