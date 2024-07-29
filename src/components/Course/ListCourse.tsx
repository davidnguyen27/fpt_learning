import CourseCard from "./CourseCard";

interface ListCourseProps {
  category_id: string;
}

const ListCourse: React.FC<ListCourseProps> = ({ category_id }) => {
  return (
    <div
      className={`lg:grid-cols-4" grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3`}
    >
      <CourseCard category_id={category_id} />
    </div>
  );
};

export default ListCourse;
