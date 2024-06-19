import { Carousel } from "antd";
import CourseCard from "../Course/CourseCard";
import { responsiveItem } from "../../const/Responsive.carouselitem";

const CarouselCourse = () => {
  return (
    <Carousel
      className="custom-carousel"
      dots={false}
      slidesToScroll={1}
      slidesToShow={4}
      arrows
      infinite
      swipeToSlide
      responsive={responsiveItem}
    >
      <CourseCard />
      <CourseCard />
      <CourseCard />
      <CourseCard />
      <CourseCard />
    </Carousel>
  );
};

export default CarouselCourse;
