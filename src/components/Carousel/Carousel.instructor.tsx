import { Carousel } from "antd";
import InstructorCard from "../Instructor/InstructorCard";
import { responsiveItem } from "../../const/Responsive.carouselitem";

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
      <InstructorCard />
      <InstructorCard />
      <InstructorCard />
      <InstructorCard />
      <InstructorCard />
    </Carousel>
  );
};

export default CarouselInstructor;
