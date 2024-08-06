import { FC, useState, useEffect } from "react";
import { Avatar, Button, Rate, message } from "antd";
import {
  FileTextOutlined,
  MenuUnfoldOutlined,
  PictureOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { CourseSubTabProps, UserData } from "../../models/Types";
import {
  getSubscriptionBySubscriberAPI,
  createUpdateSubscriptionAPI,
} from "../../services/subscriptionService";
import useCourseDetailClient from "../../hooks/course/useCourseDetailClient";
import useAddReview from "../../hooks/review/useAddReview";
import useReviewDataClient from "../../hooks/review/useReviewDataClient";
import ModalAddReview from "../Modal/ModalAddReview";
import { Review } from "../../models/Review";
import Loading from "../Loading/loading";
import { formatTime } from "../../utils/formatTime";
import { Link } from "react-router-dom";
import { getUserDetail } from "../../services/usersService";

const CourseSubTab: FC<CourseSubTabProps> = ({
  _id,
  activeTab,
  setActiveTab,
  content,
  sessions,
}) => {
  const [openSessions, setOpenSessions] = useState<string[]>([]);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [instructorData, setInstructorData] = useState<UserData | null>(null);
  const { course } = useCourseDetailClient(_id);
  const { createReview } = useAddReview(() => {});
  const { data: reviews, error, refetchData } = useReviewDataClient(_id);

  const toggleSession = (sessionId: string) => {
    setOpenSessions((prev) => (prev.includes(sessionId) ? [] : [sessionId]));
  };


  const fetchInstructorData = async () => {
    try {
      if (course?.instructor_id) {
        const fetchedUserData = await getUserDetail(course.instructor_id);
        if (fetchedUserData) {
          setInstructorData(fetchedUserData);
        } else {
          setInstructorData(null);
        }
      }
    } catch (error: any) {
      console.error("Failed to fetch instructor data:", error);
      setInstructorData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSubscription = async () => {
    try {
      const dataTransfer = {
        searchCondition: { keyword: "", is_delete: false },
        pageInfo: { pageNum: 1, pageSize: 10 },
      };

      const subscriptions = await getSubscriptionBySubscriberAPI(
        _id,
        dataTransfer,
      );
      const isSubscribed = subscriptions.some(
        (sub) => sub.instructor_id === course?.instructor_id,
      );
      setIsSubscribed(isSubscribed);
    } catch (error) {
      console.error("Failed to fetch subscription", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscribeClick = async () => {
    try {
      const instructor_id = course?.instructor_id;
      if (!instructor_id) throw new Error("Instructor ID not found");
      const subscriptionData = {
        is_subscribed: !isSubscribed,
        is_deleted: false,
      };
      await createUpdateSubscriptionAPI(instructor_id, subscriptionData);
      setIsSubscribed((prev) => !prev);
      sessionStorage.setItem(
        `subscribed_${instructor_id}`,
        JSON.stringify(!isSubscribed),
      );
      message.success(
        isSubscribed
          ? "You have successfully unsubscribed."
          : "You have successfully subscribed.",
      );
    } catch (error) {
      message.error("Failed to update subscription. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddReview = (reviewData: Review) => {
    setIsModalVisible(false);
    createReview(reviewData).then(() => {
      refetchData();
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  useEffect(() => {
    if (course?.instructor_id) {
      fetchInstructorData();
    }
  }, [course?.instructor_id]);

  useEffect(() => {
    const instructor_id = course?.instructor_id;
    if (instructor_id) {
      const storedSubscription = sessionStorage.getItem(
        `subscribed_${instructor_id}`,
      );
      if (storedSubscription) {
        setIsSubscribed(JSON.parse(storedSubscription));
      } else {
        fetchSubscription();
      }
    }
  }, [course]);

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

  const AboutTabContent = () => (
    <div
      className="mt-6 text-sm"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );

  const CourseContentTabContent = () => (
    <div className="bg-[#f3f4f6]">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Course Content</h1>
      </div>
      {sessions.map((session, sessionIndex) => (
        <div key={session._id} className="mt-2 rounded-md p-1">
          <div
            className="custom-scrollbar max-h-screen min-h-[44px] cursor-pointer overflow-y-auto rounded-md border border-gray-300 bg-gray-200 p-2 font-semibold"
            onClick={() => toggleSession(session._id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MenuUnfoldOutlined className="mr-2" />
                <span>
                  {sessionIndex + 1}. {session.name}
                </span>
              </div>
              <div className="text-sm font-medium">
                {session.lesson_list.length} Lessons •{" "}
                {formatTime(session.full_time)}
              </div>
            </div>
          </div>

          {openSessions.includes(session._id) && (
            <ul className="mt-2 space-y-2 pl-4">
              {session.lesson_list.map((lesson: any, lessonIndex) => (
                <li
                  key={lesson._id}
                  className={
                    "flex cursor-pointer items-center justify-between rounded-md border border-gray-300 p-3 text-sm"
                  }
                >
                  <span className="flex items-center">
                    {getLessonIcon(lesson.lesson_type)}{" "}
                    <span className="ml-2">
                      {lessonIndex + 1}. {lesson.name}
                    </span>
                  </span>
                  <div className="flex items-center">
                    <span>{formatTime(lesson.full_time)}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );

  const CourseReview = () => (
    <>
      <div className="mt-10 rounded-lg bg-slate-200 p-6">
        <h1 className="text-2xl font-semibold">Rating</h1>
        <div className="mt-3 bg-neutral-100 p-4">
          <span className="ml-2 text-lg text-yellow-500">
            {course?.average_rating}
          </span>
          <Rate
            className="mx-4"
            disabled
            defaultValue={course?.average_rating}
          />
          <span className="font-medium">Course rating</span>
        </div>
      </div>
      <div>
        <h1 className="my-10 text-2xl font-semibold">Student Reviews</h1>
        {error ? (
          <p>{error}</p>
        ) : reviews.length === 0 ? (
          <p>No reviews available.</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="mb-8 rounded-lg bg-slate-200 p-4">
              <div className="mb-2 flex items-center">
                <span className="font-bold text-black">
                  {review.reviewer_name}
                </span>
                <Rate disabled defaultValue={review.rating} className="ml-2" />
              </div>
              <div className="mb-2 text-sm text-gray-500">
                {new Date(review.created_at).toLocaleDateString()}
              </div>
              <p className="font-semibold">{review.comment}</p>
            </div>
          ))
        )}
      </div>
      <Button
        type="primary"
        onClick={() => setIsModalVisible(true)}
        className="mt-6"
      >
        Create Review
      </Button>
      <ModalAddReview
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={handleAddReview}
        course_id={_id}
      />
    </>
  );

  return (
    <div className="mt-5">
      <div className="px-4 py-2 pt-8">
        <div className="flex justify-between">
          <div className="ml-1 flex items-center">
            <Link to={`/user-detail/${course?.instructor_id}`}>
              <Avatar
                src={instructorData?.avatar}
                className="mr-4 size-[70px]"
                alt="Profile"
              ></Avatar>
            </Link>
            <div className="flex flex-col">
              <Link
                to={`/user-detail/${course?.instructor_id}`}
                className="mb-2 text-[16px] font-medium text-[#333333]"
              >
                {course?.instructor_name || "Instructor Name Not Available"}
              </Link>
              <Button
                onClick={handleSubscribeClick}
                type="primary"
                danger={isSubscribed ? false : true}
                style={{
                  backgroundColor: isSubscribed ? "#bfbfbf" : "#000000",
                  color: isSubscribed ? "#000000" : "#ffffff",
                }}
              >
                {isSubscribed ? "Subscribed" : "Subscribe"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-4 border-b-2 border-gray-200 font-semibold">
        <button
          className={`text-[16px] font-medium text-black ${
            activeTab === "about" ? "border-b-2 border-[#ed2a26] p-2" : "p-2"
          }`}
          onClick={() => setActiveTab("about")}
        >
          About
        </button>
        <button
          className={`text-[16px] font-medium text-black ${
            activeTab === "content" ? "border-b-2 border-[#ed2a26] p-2" : "p-2"
          }`}
          onClick={() => setActiveTab("content")}
        >
          Course Content
        </button>
        <button
          className={`text-[16px] font-medium text-black ${
            activeTab === "review" ? "border-b-2 border-[#ed2a26] p-2" : "p-2"
          }`}
          onClick={() => setActiveTab("review")}
        >
          Reviews
        </button>
      </div>

      <div className="p-6">
        {activeTab === "about" && <AboutTabContent />}
        {activeTab === "content" && <CourseContentTabContent />}
        {activeTab === "review" && <CourseReview />}
      </div>
    </div>
  );
};

export default CourseSubTab;
