import { useState, useEffect } from "react";
import {
  DownOutlined,
  FileTextOutlined,
  LockOutlined,
  PictureOutlined,
  PlayCircleOutlined,
  UpOutlined,
  LeftOutlined, // Import the LeftOutlined icon
} from "@ant-design/icons";
import { CourseDetail } from "../../models/Course";
import { Lesson } from "../../models/Lesson";
import { getDetailClientAPI } from "../../services/coursesService";
import { formatTime } from "../../utils/formatTime";
import LessonContent from "./LessonContent";
import { Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";

interface LearningComponentProps {
  courseId: string;
}

const LearningComponent: React.FC<LearningComponentProps> = ({ courseId }) => {
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const { lessonId } = useParams<{ lessonId: string }>();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      try {
        const courseDetail = await getDetailClientAPI(courseId);
        setCourse(courseDetail);

        // Nếu lessonId tồn tại trong URL, tìm và chọn bài học tương ứng
        if (lessonId) {
          const selected = courseDetail.session_list
            .flatMap((session: any) => session.lesson_list)
            .find((lesson: Lesson) => lesson._id === lessonId);
          setSelectedLesson(selected || null);
        }
      } catch (err) {
        setError("Failed to fetch course details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId, lessonId]);

  const toggleAccordion = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const handleLessonClick = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    navigate(`/learning/course/${courseId}/lesson/${lesson._id}`);
  };

  const getLessonIcon = (lessonType: string) => {
    switch (lessonType) {
      case "video":
        return <PlayCircleOutlined />;
      case "text":
        return <FileTextOutlined />;
      case "image":
        return <PictureOutlined />;
      default:
        return <FileTextOutlined />;
    }
  };

  const handleBackClick = () => {
    navigate("/"); // Navigate back to the homepage
  };

  if (loading) {
    return (
      <div className="container mx-auto flex h-64 items-center justify-center px-4 py-8">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold text-red-500">Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 bg-white p-8 shadow-lg">
        {/* Header */}
        <header className="flex items-center mb-6">
          <LeftOutlined 
            className="text-xl cursor-pointer"
            onClick={handleBackClick} 
          />
          <h1 className="ml-4 text-2xl font-bold">{course?.name}</h1>
        </header>
        
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
                    {session.lesson_list.map((lesson: any) => (
                      <li
                        key={lesson._id}
                        className="my-3 flex items-center justify-between text-[13px]"
                        onClick={() => handleLessonClick(lesson)}
                      >
                        <span>
                          {getLessonIcon(lesson.lesson_type)} {lesson.name}
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
