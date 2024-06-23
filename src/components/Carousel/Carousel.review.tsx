import { Carousel } from "antd";
import "../../styles/customCarousel.css";
import StudentReview from "../User/StudentReview";
import { responsiveItem } from "../../const/responsiveCarousel";

const CarouselReview: React.FC = () => {
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
      <StudentReview />
      <StudentReview />
      <StudentReview />
      <StudentReview />
      <StudentReview />
    </Carousel>
  );
};

export default CarouselReview;
