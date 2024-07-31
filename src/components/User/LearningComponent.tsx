import { useState, useEffect } from "react";
import {
  DownOutlined,
  LockOutlined,
  PlayCircleOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { CourseDetail } from "../../models/Course";
import { getDetailClientAPI } from "../../services/coursesService";

interface LearningComponentProps {
  courseId: string;
}

const LearningComponent: React.FC<LearningComponentProps> = ({ courseId }) => {
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      try {
        const courseDetail = await getDetailClientAPI(courseId);
        console.log("Course Detail:", courseDetail);
        setCourse(courseDetail);
      } catch (err) {
        setError("Failed to fetch course details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const toggleAccordion = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 bg-white p-8 shadow-lg">
        <div className="video-container">
          <video className="h-auto w-full" controls>
            <source
              src={course?.video_url || "video-placeholder.mp4"}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="mt-6">
          <h1 className="mb-4 text-3xl font-bold">{course?.name}</h1>
          <div className="mb-2 flex items-center">
            <PlayCircleOutlined className="mr-2 text-2xl" />
            <h2 className="text-xl">{course?.category_name}</h2>
          </div>
          <p className="text-gray-700">{course?.content}</p>
        </div>
      </div>

      <div className="w-96 overflow-auto bg-gray-800 p-6 text-white">
        <h3 className="mb-4 text-lg font-semibold">Content</h3>
        {course?.is_purchased ? (
          <ul>
            {course.session_list.map((session, index) => (
              <li key={session._id} className="mb-4">
                <div
                  className="flex cursor-pointer items-center justify-between"
                  onClick={() => toggleAccordion(index)}
                >
                  <span>{session.name}</span>
                  <span>
                    {activeIndex === index ? <UpOutlined /> : <DownOutlined />}
                  </span>
                </div>
                {activeIndex === index && (
                  <ul className="mt-2 space-y-2 pl-4">
                    {session.lesson_list.map((lesson) => (
                      <li
                        key={lesson._id}
                        className="flex items-center justify-between text-sm"
                      >
                        <span>{lesson.name}</span>
                        <div className="flex items-center">
                          <span>{lesson.full_time} mins</span>
                          {lesson.lesson_type === "locked" && (
                            <LockOutlined className="ml-2" />
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div>You have not purchased this course.</div>
        )}
      </div>
    </div>
  );
};

export default LearningComponent;
