import { useState, useEffect } from "react";
import {
  DownOutlined,
  LockOutlined,
  PlayCircleOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { CourseDetail } from "../../models/Course";
import { Lesson } from "../../models/Lesson";
import { getDetailClientAPI } from "../../services/coursesService";
import { formatTime } from "../../utils/formatTime";
import LessonContent from "./LessonContent";
import Loading from "../Loading/loading";

interface LearningComponentProps {
  courseId: string;
}

const LearningComponent: React.FC<LearningComponentProps> = ({ courseId }) => {
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      try {
        const courseDetail = await getDetailClientAPI(courseId);
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

  const handleLessonClick = (lesson: Lesson) => {
    setSelectedLesson(lesson);
  };

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 bg-white p-8 shadow-lg">
        {selectedLesson && <LessonContent lessonId={selectedLesson._id} />}
        <div className="mt-6">
          <h1 className="mb-4 text-3xl font-bold">{course?.name}</h1>
          <div className="mb-2">
            <p className="text-sm">{course?.category_name}</p>
            <p className="text-base">{course?.description}</p>
          </div>
          <div
            className="text-grey-400 mt-6"
            dangerouslySetInnerHTML={{ __html: course?.content || "" }}
          />
        </div>
      </div>

      <div className="w-96 overflow-auto bg-slate-200 p-6">
        <h3 className="mb-4 text-xl font-semibold">Content knowledge</h3>
        {course?.is_purchased ? (
          <ul>
            {course?.session_list.map((session, index) => (
              <li key={session._id} className="mb-4">
                <div
                  className="flex cursor-pointer items-center justify-between bg-slate-400 p-3"
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="text-sm">{session.name}</span>
                  <span>
                    {activeIndex === index ? <UpOutlined /> : <DownOutlined />}
                  </span>
                </div>
                {activeIndex === index && (
                  <ul className="mt-2 space-y-2 pl-4">
                    {session.lesson_list.map((lesson) => (
                      <li
                        key={lesson._id}
                        className="my-3 flex items-center justify-between text-[13px]"
                        onClick={() => handleLessonClick(lesson)}
                      >
                        <span>
                          <PlayCircleOutlined /> {lesson.name}
                        </span>
                        <div className="flex items-center">
                          <span>{formatTime(lesson.full_time)}</span>
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
