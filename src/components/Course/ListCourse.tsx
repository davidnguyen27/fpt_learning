import CourseCard from "./CourseCard";

const ListCourse = ({ vertical = false }) => {
  return (
    <div
      className={`grid gap-4 ${vertical ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"}`}
    >
      <CourseCard />
    </div>
  );
};

export default ListCourse;
