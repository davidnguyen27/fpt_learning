import { Carousel } from "antd";
import "../../styles/customCarousel.css";
import StudentReview from "../User/StudentReview";
import { responsiveItem } from "../../const/responsiveCarousel";
import KhanhVinh from "../../assets/Image/KhanhVinh.jpg";
import TheAnh from "../../assets/Image/TheAnh.jpg";
import AnhPhu from "../../assets/Image/AnhPhu.jpg";

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
      <StudentReview
        name="Trần Khánh Vinh"
        img={KhanhVinh}
        cmt="Đứng ở dưới thì nhảy mạnh lên... Ai sợ thì đi về... Phong cách... Phong cách... Phong cách!..."
      />
      <StudentReview
        name="Nguyễn Thế Anh"
        img={TheAnh}
        cmt="Đứng ở dưới thì nhảy mạnh lên... Ai sợ thì đi về... Phong cách... Phong cách... Phong cách!..."
      />
      <StudentReview
        name="Võ Nguyễn Anh Phú"
        img={AnhPhu}
        cmt="Đứng ở dưới thì nhảy mạnh lên... Ai sợ thì đi về... Phong cách... Phong cách... Phong cách!..."
      />
    </Carousel>
  );
};

export default CarouselReview;
