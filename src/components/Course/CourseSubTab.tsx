import { FC, useState, useEffect } from 'react';
import { Button, Rate, message } from 'antd'; 
import { MenuUnfoldOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { CourseSubTabProps } from '../../models/Types';
import { getSubscriptionBySubscriberAPI, createUpdateSubscriptionAPI } from '../../services/subscriptionService';
import useCourseDetailClient from '../../hooks/course/useCourseDetailClient';
import useAddReview from '../../hooks/review/useAddReview';
import useReviewDataClient from '../../hooks/review/useReviewDataClient';
import ModalAddReview from '../Modal/ModalAddReview';
import { Review } from '../../models/Review';

const CourseSubTab: FC<CourseSubTabProps> = ({
  _id,
  activeTab,
  setActiveTab,
  content,
  sessions,
}) => {
  const [openSessions, setOpenSessions] = useState<string[]>([]);
  const { course } = useCourseDetailClient(_id);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const { createReview } = useAddReview(() => {
  });
  const { data: reviews, loading, error, refetchData } = useReviewDataClient(_id);

  const toggleSession = (sessionId: string) => {
    setOpenSessions((prev) =>
      prev.includes(sessionId)
        ? prev.filter((id) => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  const fetchSubscription = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) throw new Error('Cannot get token!');

      const dataTransfer = {
        searchCondition: { keyword: '', is_delete: false },
        pageInfo: { pageNum: 1, pageSize: 10 },
      };

      const subscriptions = await getSubscriptionBySubscriberAPI(_id, dataTransfer);
      const isSubscribed = subscriptions.some(
        (sub) => sub.instructor_id === course?.instructor_id
      );
      setIsSubscribed(isSubscribed);
    } catch (error) {
      console.error('Failed to fetch subscription', error);
    }
  };

  const handleSubscribeClick = async () => {
    try {
      const instructor_id = course?.instructor_id;
      if (!instructor_id) throw new Error('Instructor ID not found');

      const subscriptionData = { is_subscribed: !isSubscribed, is_deleted: false };
      await createUpdateSubscriptionAPI(instructor_id, subscriptionData);

      setIsSubscribed((prev) => !prev);
      localStorage.setItem(
        `subscribed_${instructor_id}`,
        JSON.stringify(!isSubscribed)
      );

      message.success(
        isSubscribed
          ? 'You have successfully unsubscribed.'
          : 'You have successfully subscribed.'
      );
    } catch (error) {
      message.error('Failed to update subscription. Please try again.');
    }
  };

  const handleAddReview = (reviewData: Review) => {
    setIsModalVisible(false);
    createReview(reviewData).then(() => {
      refetchData();
    });
  };

  useEffect(() => {
    const instructor_id = course?.instructor_id;
    if (instructor_id) {
      const storedSubscription = localStorage.getItem(
        `subscribed_${instructor_id}`
      );
      if (storedSubscription) {
        setIsSubscribed(JSON.parse(storedSubscription));
      } else {
        fetchSubscription();
      }
    }
  }, [course]);

  const AboutTabContent = () => (
    <div className="mt-6 text-sm" dangerouslySetInnerHTML={{ __html: content }} />
  );

  const CourseContentTabContent = () => (
    <div>
      {sessions.map((session) => (
        <div key={session._id} className="mt-6 rounded-md bg-slate-200 px-3 py-2">
          <div className="cursor-pointer text-sm font-bold" onClick={() => toggleSession(session._id)}>
            <MenuUnfoldOutlined /> <span>{session.name}</span>
          </div>
          {openSessions.includes(session._id) && (
            <div className="mt-4 flex items-center justify-between">
              <div className="px-4 py-2">
                {session.lesson_list.map((lesson, idx) => (
                  <div key={idx} className="ml-4 block">
                    <PlayCircleOutlined /> {lesson.name}
                  </div>
                ))}
              </div>
              <div>{session.full_time}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const CourseReview = () => (
    <>
      <div className="mt-10 bg-slate-200 p-6 rounded-lg">
        <h1 className="text-2xl font-semibold">Rating</h1>
        <div className="mt-3 bg-neutral-100 p-4">
          <span className="ml-2 text-lg text-yellow-500">
            {course?.average_rating}
          </span>
          <Rate className="mx-4" defaultValue={course?.average_rating} />
          <span className="font-medium">Course rating</span>
        </div>
      </div>
      <div>
        <h1 className="my-10 text-2xl font-semibold">Student Reviews</h1>
        {loading ? (
          <p>Loading reviews...</p>
        ) : error ? (
          <p>{error}</p>
        ) : reviews.length === 0 ? (
          <p>No reviews available.</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="mb-8 p-4 rounded-lg bg-slate-200">
              <div className="flex items-center mb-2">
                <span className="font-bold text-black">{review.reviewer_name}</span>
                <Rate disabled defaultValue={review.rating} className="ml-2" />
              </div>
              <div className="text-sm text-gray-500 mb-2">
                {new Date(review.created_at).toLocaleDateString()}
              </div>
              <p className="font-semibold">{review.comment}</p>
            </div>
          ))
        )}
      </div>
      <Button type="primary" onClick={() => setIsModalVisible(true)} className="mt-6">
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
            <a href="#">
              <img
                src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/436257762_1831258874036043_7962583851360585901_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeFwSGYfZE8msByC8I97nfjowSj0rDZQ20DBKPSsNlDbQE9jTgn8CuJ0oWUNvpzlM8wnVxCPXT6LNA8QJLaMp7eP&_nc_ohc=BkqdrwZZLVAQ7kNvgEX9iPZ&_nc_ht=scontent.fsgn2-5.fna&oh=00_AYAG1xWT0LZY19MGUmWsvhnxuv6Y2Ui_WGhlPgdeNiDonQ&oe=66A7BF43"
                className="mr-4 size-[50px]"
                alt="Profile"
              />
            </a>
            <div className="flex flex-col">
              <a
                href="#"
                className="mb-2 text-[16px] font-medium text-[#333333]"
              >
                {course?.instructor_name || "Instructor Name Not Available"}
              </a>
              <Button
                onClick={handleSubscribeClick}
                className={`rounded-sm px-3 py-2 text-[14px] text-white ${
                  isSubscribed ? "bg-gray-600" : "bg-red-600"
                }`}
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
