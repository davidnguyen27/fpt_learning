import Achievements from "../../components/User/Achievements";
import {
  CarouselInstructor,
  CarouselReview,
  ListCourse,
} from "../../components";
import MainLayout from "../../components/Layout/MainLayout";
import ImageSlider from "../../components/User/ImageSlide";
import "../../styles/homepage.css";
import { Link } from "react-router-dom";
import slider_1 from "../../assets/Image/slider1.jpg";
import slider_2 from "../../assets/Image/slider2.jpg";
import slider_3 from "../../assets/Image/slider3.jpg";
import slider_4 from "../../assets/Image/slider4.jpg";

const HomePage: React.FC = () => {
  const slides = [
    {
      url: slider_1,
      title: "slider_1",
    },
    {
      url: slider_2,
      title: "slider_2",
    },
    {
      url: slider_3,
      title: "slider_3",
    },
    {
      url: slider_4,
      title: "slider_4",
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
      <section className="mx-0 mt-10">
        <div className="mb-5 flex w-full justify-between">
          <h1 className="text-xl font-bold">Web Development</h1>
          <Link
            to="/category/66827468b5436c3f43c703e7"
            className="text-xs font-medium text-gray-500 hover:text-black"
          >
            See all
          </Link>
        </div>
        <ListCourse category_id="66827468b5436c3f43c703e7" />
      </section>
      <section className="mx-0 mt-10">
        <div className="mb-5 flex w-full justify-between">
          <h1 className="text-xl font-bold">Information Technology</h1>
          <Link
            to="/category/668e2f4bf2c243ced095c6c0"
            className="text-xs font-medium text-gray-500 hover:text-black"
          >
            See all
          </Link>
        </div>
        <ListCourse category_id="668e2f4bf2c243ced095c6c0" />
      </section>
      <section className="mx-0 mt-10">
        <div className="mb-5 flex w-full justify-between">
          <h1 className="text-xl font-bold">Business</h1>
          <Link
            to="/category/66840803c2ef7156100c3f61"
            className="text-xs font-medium text-gray-500 hover:text-black"
          >
            See all
          </Link>
        </div>
        <ListCourse category_id="66840803c2ef7156100c3f61" />
      </section>
      <section className="mx-0 mt-10">
        <div className="mb-5 flex w-full justify-between">
          <h1 className="text-xl font-bold">Music</h1>
          <Link
            to="/category/669f294e396c0261a73f5a7a"
            className="text-xs font-medium text-gray-500 hover:text-black"
          >
            See all
          </Link>
        </div>
        <ListCourse category_id="669f294e396c0261a73f5a7a" />
      </section>
      <section className="mx-0 mt-10">
        <div className="mb-5 flex w-full justify-between">
          <h1 className="text-xl font-bold">Marketing</h1>
          <Link
            to="/category/668f6c0320c527aff59b0f8b"
            className="text-xs font-medium text-gray-500 hover:text-black"
          >
            See all
          </Link>
        </div>
        <ListCourse category_id="668f6c0320c527aff59b0f8b" />
      </section>
      <section className="mx-0 mt-10">
        <div className="mb-5 flex w-full justify-between">
          <h1 className="text-xl font-bold">Graphic Design</h1>
          <Link
            to="/category/668b4abf03350733f0080b9a"
            className="text-xs font-medium text-gray-500 hover:text-black"
          >
            See all
          </Link>
        </div>
        <ListCourse category_id="668b4abf03350733f0080b9a" />
      </section>
      <Achievements />
      <section className="mx-0">
        <div className="mb-5 flex w-full justify-between">
          <h1 className="text-xl font-bold">Popular Instructors</h1>
          <a
            href="#"
            className="text-xs font-medium text-gray-500 hover:text-black"
          >
            See all
          </a>
        </div>
        <CarouselInstructor />
      </section>
      <section className="mx-0 my-10">
        <h1 className="mb-5 text-xl font-bold">What Our Student Have Today</h1>
        <CarouselReview />
      </section>
    </MainLayout>
  );
};

export default HomePage;
