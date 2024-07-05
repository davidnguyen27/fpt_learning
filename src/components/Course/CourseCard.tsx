import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/redux/store";
import { fetchCourses } from "../../app/redux/courses/courseSlice";

const CourseCard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { course, loading, error } = useSelector(
    (state: RootState) => state.course,
  );

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {course.map((item) => (
        <article
          key={item.id}
          className="h-auto w-auto cursor-pointer rounded-md bg-slate-200 transition-transform duration-300 hover:scale-105 hover:bg-slate-300"
          onClick={() => navigate("/detail")}
        >
          <div className="p-4">
            <div>
              <img src={item.image} alt={item.courseName} className="rounded-md" />
            </div>
            <div className="my-3 flex justify-between">
              <div>
                <span>1M Students</span>
              </div>
              <div>
                <i className="fa-solid fa-ellipsis-vertical cursor-pointer hover:text-amber-500"></i>
              </div>
            </div>
            <h3 className="font-semibold">{item.courseName}</h3>
            <div className="my-2">
              <span className="text-xs font-light">{item.categoryName}</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs">
                By <span className="font-medium">{item.instructorName}</span>
              </p>
              <i className="fa-solid fa-cart-plus ml-14 cursor-pointer"></i>
              <span>${item.price}</span>
            </div>
          </div>
        </article>
      ))}
    </>
  );
};

export default CourseCard;
