import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tag, Button, message } from "antd";
import StudentLayout from "../../components/Layout/StudentLayout";
import Loading from "../../components/Loading/loading";
import { getSubscriptionBySubscriberAPI, createUpdateSubscriptionAPI } from "../../services/subscriptionService";
import useDetailUser from "../../hooks/user/useDetailUser";

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user: userDetail, loading, error } = useDetailUser(id || "");
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [isLoadingSubscription, setIsLoadingSubscription] = useState<boolean>(false);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        if (id) {
          const dataTransfer = {
            searchCondition: { keyword: "", is_delete: false },
            pageInfo: { pageNum: 1, pageSize: 10 },
          };

          const subscriptions = await getSubscriptionBySubscriberAPI(id, dataTransfer);
          const isSubscribed = subscriptions.some((sub) => sub.instructor_id === id);
          setIsSubscribed(isSubscribed);
        }
      } catch (error) {
        console.error("Failed to fetch subscription", error);
      } finally {
        setIsLoadingSubscription(false);
      }
    };

    if (id) {
      const storedSubscription = sessionStorage.getItem(`subscribed_${id}`);
      if (storedSubscription) {
        setIsSubscribed(JSON.parse(storedSubscription));
        setIsLoadingSubscription(false);
      } else {
        fetchSubscription();
      }
    }
  }, [id]);

  const handleSubscribeClick = async () => {
    setIsLoadingSubscription(true);
    try {
      if (!id) throw new Error("User ID not found");

      const subscriptionData = {
        is_subscribed: !isSubscribed,
        is_deleted: false,
      };

      await createUpdateSubscriptionAPI(id, subscriptionData);

      setIsSubscribed((prev) => !prev);
      sessionStorage.setItem(`subscribed_${id}`, JSON.stringify(!isSubscribed));

      message.success(
        isSubscribed
          ? "You have successfully unsubscribed."
          : "You have successfully subscribed."
      );
    } catch (error) {
      message.error("Failed to update subscription. Please try again.");
    } finally {
      setIsLoadingSubscription(false);
    }
  };

  if (loading) {
    return <div><Loading /></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!userDetail) {
    return <div>User not found</div>;
  }

  // Conditional Tag content and color based on role
  const tagContent = userDetail.role === 'instructor'
    ? "Instructor Partner with FSA Education"
    : "Student of FSA Education";
  const tagColor = userDetail.role === 'instructor' ? "geekblue" : "green";

  return (
    <StudentLayout>
      <div className="mx-auto max-w-4xl p-4">
        <div className="flex flex-col lg:flex-row lg:items-start">
          <div className="lg:w-1/2 lg:pr-8">
            <h2 className="text-xl mb-2">{userDetail.role.toLocaleUpperCase()}</h2>
            <h1 className="text-3xl font-bold mb-2">{userDetail.name}</h1>
            <Tag color={tagColor} className="mt-2">
              {tagContent}
            </Tag>
            <div className="mt-8">
              <h3 className="mb-4 text-xl font-semibold">About me</h3>
              <div dangerouslySetInnerHTML={{ __html: userDetail.description }} />
            </div>
          </div>
          <div className="flex flex-col items-center lg:w-1/2 lg:items-center lg:pl-8">
            <div className="h-32 w-32 overflow-hidden rounded-full">
              <img
                src={userDetail.avatar}
                alt={`${userDetail.name}'s avatar`}
                className="h-full w-full object-cover"
              />
            </div>
            {/* Conditionally render the Subscription Button based on role */}
            {userDetail.role === 'instructor' && (
              <Button
                onClick={handleSubscribeClick}
                type="primary"
                danger={!isSubscribed}
                loading={isLoadingSubscription}
                style={{
                  marginTop: "16px",
                  backgroundColor: isSubscribed ? "#bfbfbf" : "#000000",
                  color: isSubscribed ? "#000000" : "#ffffff",
                }}
              >
                {isSubscribed ? "Subscribed" : "Subscribe"}
              </Button>
            )}
            <div className="text-center">
              <h3 className="mb-2 mt-6 text-xl font-semibold">Contact me</h3>
              <Tag color="geekblue" className="mb-2">
                Email: {userDetail.email}
              </Tag>
              {userDetail.phone_number && (
                <>
                  <br />
                  <Tag color="geekblue">Phone: {userDetail.phone_number}</Tag>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default UserDetail;
