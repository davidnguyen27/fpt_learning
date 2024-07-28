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
      url: "https://cdn.discordapp.com/attachments/738116083764035644/1267045175562338385/image.png?ex=66a75b46&is=66a609c6&hm=f7a0012576c20d74d4fa29e89acc624ebe16bfeb59aea63c5ad38830146f7fa1&",
      title: "forest",
    },
    {
      url: "https://fschool.fpt.edu.vn/wp-content/uploads/2023/04/cover-70ty-01-1-2048x758.jpg",
      title: "city",
    },
    {
      url: "https://cdn.discordapp.com/attachments/738116083764035644/1267048493592219708/image.png?ex=66a75e5d&is=66a60cdd&hm=0c0bc25f3b5436759b8674e296985c54a4242dcc5a98ffcd1e4bed51ea9e91f7&",
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
          <h1 className="text-xl font-bold">Newest Courses</h1>
          <a href="#" className="font-light hover:text-amber-600">
            See all
          </a>
        </div>
        <ListCourse />
      </section>
      <section className="mt-10">
        <div className="mb-5 flex w-full justify-between">
          <h1 className="text-xl font-bold">Best Seller</h1>
          <a href="#" className="font-light hover:text-amber-600">
            See all
          </a>
        </div>
        <ListCourse />
      </section>
      <section className="mt-10">
        <div className="mb-5 flex w-full justify-between">
          <h1 className="text-xl font-bold">Information Technology</h1>
          <a href="#" className="font-light hover:text-amber-600">
            See all
          </a>
        </div>
        <ListCourse />
      </section>
      <section className="mt-10">
        <div className="mb-5 flex w-full justify-between">
          <h1 className="text-xl font-bold">Business</h1>
          <a href="#" className="font-light hover:text-amber-600">
            See all
          </a>
        </div>
        <ListCourse />
      </section>
      <section className="mt-10">
        <div className="mb-5 flex w-full justify-between">
          <h1 className="text-xl font-bold">Marketing</h1>
          <a href="#" className="font-light hover:text-amber-600">
            See all
          </a>
        </div>
        <ListCourse />
      </section>
      <section className="mt-10">
        <div className="mb-5 flex w-full justify-between">
          <h1 className="text-xl font-bold">Data & Analytics</h1>
          <a href="#" className="font-light hover:text-amber-600">
            See all
          </a>
        </div>
        <ListCourse />
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
