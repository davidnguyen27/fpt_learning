import { Carousel } from "antd";
import { responsiveItem } from "../../const/responsiveCarousel";
import StudentCourseCard from "./StudentCourseCard";

const CarouselInstructor: React.FC = () => {
  return (
    <Carousel
      className="custom-carousel"
      dots={false}
      slidesToShow={4}
      slidesToScroll={1}
      arrows
      infinite
      swipeToSlide
      responsive={responsiveItem}
    >
      <StudentCourseCard />
      <StudentCourseCard />
      <StudentCourseCard />
      <StudentCourseCard />
      <StudentCourseCard />
      <StudentCourseCard />
      <StudentCourseCard />
      <StudentCourseCard />
      <StudentCourseCard />
    </Carousel>
  );
};

export default CarouselInstructor;
