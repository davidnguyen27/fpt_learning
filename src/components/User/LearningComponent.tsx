import { useState, useEffect } from "react";
import {
  DownOutlined,
  FileTextOutlined,
  LockOutlined,
  PictureOutlined,
  PlayCircleOutlined,
  UpOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { CourseDetail } from "../../models/Course";
import { Lesson } from "../../models/Lesson";
import { getDetailClientAPI } from "../../services/coursesService";
import { formatTime } from "../../utils/formatTime";
import LessonContent from "./LessonContent";
import { Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/index.css";
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
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const { lessonId } = useParams<{ lessonId: string }>();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      try {
        const courseDetail = await getDetailClientAPI(courseId);
        setCourse(courseDetail);
        const allLessons = courseDetail.session_list.flatMap(
          (session: any) => session.lesson_list,
        );
        setLessons(allLessons);

        if (lessonId) {
          const selected = allLessons.find(
            (lesson: Lesson) => lesson._id === lessonId,
          );
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
    navigate(`/detail/course/${courseId}`); 
  };

  const handlePreviousLesson = () => {
    if (selectedLesson) {
      const currentIndex = lessons.findIndex(
        (lesson) => lesson._id === selectedLesson._id,
      );
      if (currentIndex > 0) {
        const previousLesson = lessons[currentIndex - 1];
        navigate(`/learning/course/${courseId}/lesson/${previousLesson._id}`);
      }
    }
  };

  const handleNextLesson = () => {
    if (selectedLesson) {
      const currentIndex = lessons.findIndex(
        (lesson) => lesson._id === selectedLesson._id,
      );
      if (currentIndex < lessons.length - 1) {
        const nextLesson = lessons[currentIndex + 1];
        navigate(`/learning/course/${courseId}/lesson/${nextLesson._id}`);
      }
    }
  };

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold text-red-500">Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex w-full items-center bg-[#29303B] p-3 text-white shadow-lg">
        <LeftOutlined
          className="cursor-pointer text-xl"
          onClick={handleBackClick}
        />
        <a href="/" className="ml-4 w-12 cursor-pointer">
          <img src="/FSA.svg" alt="FSA Education" />
        </a>
        <h1 className="ml-6 text-2xl font-bold">{course?.name}</h1>
      </header>
      <div className="flex flex-1">
        <div className="custom-scrollbar max-h-screen flex-1 overflow-y-auto bg-white p-8 shadow-lg">
          {selectedLesson && <LessonContent lessonId={selectedLesson._id} />}
          <div className="mt-6">
            <h1 className="mb-4 text-3xl font-bold">{course?.name}</h1>
            <div className="mb-2">
              <p className="text-sm">{course?.category_name}</p>
              <p className="text-base">{course?.description}</p>
            </div>
            <div
              className="mt-6 text-gray-400"
              dangerouslySetInnerHTML={{ __html: course?.content || "" }}
            />
          </div>
        </div>

        <div className="w-96 overflow-auto bg-[#f3f4f6] p-6">
          <h4 className="mb-4 text-xl font-semibold">Course content</h4>
          {course?.is_purchased ? (
            <ul>
              {course?.session_list.map((session, sessionIndex) => {
                const lessonCount = session.lesson_list.length;
                const totalDuration = session.lesson_list.reduce(
                  (total, lesson) => total + lesson.full_time,
                  0,
                );
                return (
                  <li key={session._id} className="mb-4">
                    <div className="custom-scrollbar max-h-screen cursor-pointer overflow-y-auto rounded-md border border-gray-300 bg-gray-200 p-2">
                      <div
                        className="flex items-center justify-between"
                        onClick={() => toggleAccordion(sessionIndex)}
                      >
                        <div>
                          <span className="text-sm font-semibold">
                            {sessionIndex + 1}. {session.name}
                          </span>
                          <div className="text-xs text-gray-600">
                            {lessonCount} lessons • {formatTime(totalDuration)}
                          </div>
                        </div>
                        <span>
                          {activeIndex === sessionIndex ? (
                            <UpOutlined />
                          ) : (
                            <DownOutlined />
                          )}
                        </span>
                      </div>
                    </div>
                    {activeIndex === sessionIndex && (
                      <ul className="mt-2 space-y-2 pl-4">
                        {session.lesson_list.map((lesson: any, lessonIndex) => (
                          <li
                            key={lesson._id}
                            className={`flex cursor-pointer items-center justify-between rounded-md border border-gray-300 p-3 text-sm ${
                              selectedLesson?._id === lesson._id
                                ? "bg-orange-200"
                                : "bg-white"
                            }`}
                            onClick={() => handleLessonClick(lesson)}
                          >
                            <span className="flex items-center">
                              {getLessonIcon(lesson.lesson_type)}{" "}
                              <span className="ml-2">
                                {lessonIndex + 1}. {lesson.name}
                              </span>
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
                );
              })}
            </ul>
          ) : (
            <div>You have not purchased this course.</div>
          )}
        </div>
      </div>
      <footer className="fixed bottom-0 left-0 flex w-full items-center justify-center gap-8 bg-[#F0F0F0] p-4 shadow-lg">
        <Button
          className="btn-primary"
          type="primary"
          disabled={
            !selectedLesson ||
            lessons.findIndex((lesson) => lesson._id === selectedLesson._id) ===
              0
          }
          onClick={handlePreviousLesson}
        >
          <LeftOutlined /> Previous Lesson
        </Button>
        <Button
          className="btn-primary"
          type="primary"
          disabled={
            !selectedLesson ||
            lessons.findIndex((lesson) => lesson._id === selectedLesson._id) ===
              lessons.length - 1
          }
          onClick={handleNextLesson}
        >
          Next Lesson <RightOutlined />
        </Button>
      </footer>
    </div>
  );
};

export default LearningComponent;
