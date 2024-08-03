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

const HomePage: React.FC = () => {
  const slides = [
    {
      url: "https://cdn.discordapp.com/attachments/739929914609762425/1267295057216798840/WORKOUT_2.png?ex=66ac387e&is=66aae6fe&hm=d2749e0ab546e2d201fcc5733f916ceff37cb433db25b0f8497fe5d6f5e0abae&",
      title: "beach",
    },
    {
      url: "https://cdn.discordapp.com/attachments/739929914609762425/1267295056528937083/WORKOUT_3.png?ex=66ac387e&is=66aae6fe&hm=8c85027b59044740bd08c50b933da0a423f1cffc00aae64d3208a77bad825e1a&",
      title: "forest",
    },
    {
      url: "https://cdn.discordapp.com/attachments/739929914609762425/1267295058416373823/WORKOUT.png?ex=66ac387f&is=66aae6ff&hm=67440e2373d21ccc85a961129a95c4055b7f88e492004227d606488078912551&",
      title: "city",
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
          <Link
            to="/category/66827468b5436c3f43c703e7"
            className="font-medium text-gray-500 hover:text-black"
          >
            See all
          </Link>
        </div>
        <ListCourse category_id="66827468b5436c3f43c703e7" />
      </section>
      <section className="mt-10">
        <div className="mb-5 flex w-full justify-between">
          <h1 className="text-xl font-bold">Information Technology</h1>
          <Link
            to="/category/668e2f4bf2c243ced095c6c0"
            className="font-medium text-gray-500 hover:text-black"
          >
            See all
          </Link>
        </div>
        <ListCourse category_id="668e2f4bf2c243ced095c6c0" />
      </section>
      <section className="mt-10">
        <div className="mb-5 flex w-full justify-between">
          <h1 className="text-xl font-bold">Business</h1>
          <Link
            to="/category/66840803c2ef7156100c3f61"
            className="font-medium text-gray-500 hover:text-black"
          >
            See all
          </Link>
        </div>
        <ListCourse category_id="66840803c2ef7156100c3f61" />
      </section>
      <section className="mt-10">
        <div className="mb-5 flex w-full justify-between">
          <h1 className="text-xl font-bold">Music</h1>
          <Link
            to="/category/669f294e396c0261a73f5a7a"
            className="font-medium text-gray-500 hover:text-black"
          >
            See all
          </Link>
        </div>
        <ListCourse category_id="669f294e396c0261a73f5a7a" />
      </section>
      <section className="mt-10">
        <div className="mb-5 flex w-full justify-between">
          <h1 className="text-xl font-bold">Marketing</h1>
          <Link
            to="/category/668f6c0320c527aff59b0f8b"
            className="font-medium text-gray-500 hover:text-black"
          >
            See all
          </Link>
        </div>
        <ListCourse category_id="668f6c0320c527aff59b0f8b" />
      </section>
      <section className="mt-10">
        <div className="mb-5 flex w-full justify-between">
          <h1 className="text-xl font-bold">Graphic Design</h1>
          <Link
            to="/category/668b4abf03350733f0080b9a"
            className="font-medium text-gray-500 hover:text-black"
          >
            See all
          </Link>
        </div>
        <ListCourse category_id="668b4abf03350733f0080b9a" />
      </section>
      <Achievements />
      <section>
        <div className="mb-5 flex w-full justify-between">
          <h1 className="text-xl font-bold">Popular Instructors</h1>
          <a href="#" className="font-medium text-gray-500 hover:text-black">
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
