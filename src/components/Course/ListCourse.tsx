import CourseCard from "./CourseCard";

interface ListCourseProps {
  category_id: string;
}

const ListCourse: React.FC<ListCourseProps> = ({ category_id }) => {
  return (
    <div className="grid grid-cols-5 gap-5 md:grid-cols-3 md:gap-5">
      <CourseCard category_id={category_id} />
    </div>
  );
};

export default ListCourse;
