import Switch from "antd/es/switch";
import { useState } from "react";

const SettingNotify: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<boolean>(true);
  const [recommendedCourses, setRecommendedCourses] = useState<boolean>(true);
  const [replyComments, setReplyComments] = useState<boolean>(false);
  const [emailNotifications, setEmailNotifications] = useState<boolean>(true);
  const [promotions, setPromotions] = useState<boolean>(false);

  const toggleSubscription = () => {
    setSubscriptions(!subscriptions);
  };

  const toggleRecommendedCourses = () => {
    setRecommendedCourses(!recommendedCourses);
  };

  const toggleReplyComments = () => {
    setReplyComments(!replyComments);
  };

  const toggleEmailNotifications = () => {
    setEmailNotifications(!emailNotifications);
  };

  const togglePromotions = () => {
    setPromotions(!promotions);
  };

  return (
    <div>
      <div className="section">
        <h2 className="section-heading">Notifications</h2>
        <p>Select push and email notifications you'd like to receive.</p>
        <h2 className="section-heading">Choose when and how to be notified</h2>
        <div className="setting-item">
          <Switch checked={subscriptions} onChange={toggleSubscription} />
          <span className="setting-label">Subscriptions</span>
        </div>
        <p className="setting-description">
          Notify me about activity from the profiles I'm subscribed to
        </p>
        <div className="setting-item">
          <Switch
            checked={recommendedCourses}
            onChange={toggleRecommendedCourses}
          />
          <span className="setting-label">Recommended Courses</span>
        </div>
        <p className="setting-description">
          Notify me of courses I might like based on what I watch
        </p>
        <div className="setting-item">
          <Switch checked={replyComments} onChange={toggleReplyComments} />
          <span className="setting-label">Reply Comments</span>
        </div>
        <div className="setting-item">
          <p className="setting-description">
            Notify me about replies to my comments.
          </p>
        </div>
      </div>

      <div className="section">
        <h2 className="section-heading">Email Notifications</h2>
        <p>
          Your emails are sent to gambol943@gmail.com. To unsubscribe, click the
          "Unsubscribe" link at the bottom of any email.
        </p>
        <div className="setting-item">
          <Switch
            checked={emailNotifications}
            onChange={toggleEmailNotifications}
          />
          <span className="setting-label">Email Notifications</span>
        </div>
        <div className="setting-item">
          <p className="setting-description">
            If turned off, FPT education may still send you important messages.
          </p>
        </div>
        <div className="setting-item">
          <Switch checked={promotions} onChange={togglePromotions} />
          <span className="setting-label">Promotions</span>
        </div>
        <p className="setting-description">
          Notify about promotions or rewards I might get.
        </p>
      </div>
    </div>
  );
};
export default SettingNotify;
