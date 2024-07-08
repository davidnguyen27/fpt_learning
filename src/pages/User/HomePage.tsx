import Achievements from "../../components/User/Achievements";
import {
  CarouselInstructor,
  CarouselReview,
  ListCourse,
} from "../../components";
import MainLayout from "../../components/Layout/MainLayout";

const HomePage: React.FC = () => {
  return (
    <MainLayout>
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
