import { CourseSubTabProps } from "../../models/Types";
import { MenuUnfoldOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { Rate } from "antd";
import { useState } from "react";

const CourseSubTab: React.FC<CourseSubTabProps> = ({
  activeTab,
  setActiveTab,
  content,
  sessions,
}) => {
  const [openSessions, setOpenSessions] = useState<string[]>([]);

  const toggleSession = (sessionId: string) => {
    if (openSessions.includes(sessionId)) {
      setOpenSessions(openSessions.filter((id) => id !== sessionId));
    } else {
      setOpenSessions([...openSessions, sessionId]);
    }
  };

  const AboutTabContent = () => (
    <div
      className="mt-6 text-sm"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );

  const CourseContentTabContent = () => (
    <div>
      {sessions.map((session) => (
        <div
          key={session._id}
          className="mt-6 rounded-md bg-slate-200 px-3 py-2"
        >
          <div
            className="cursor-pointer text-sm font-bold"
            onClick={() => toggleSession(session._id)}
          >
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
      <div className="mt-10 bg-slate-200 p-6">
        <h1 className="text-2xl font-semibold">Rating</h1>
        <div className="mt-3 bg-neutral-100 p-4">
          <span className="font-medium">4.6</span>
          <Rate className="mx-4" defaultValue={4.6} />
          <span className="font-medium">Course rating</span>
        </div>
        <div className="my-5 flex items-center justify-between space-x-4">
          <div className="relative h-4 flex-1 overflow-hidden rounded-md bg-neutral-100">
            <div
              className="absolute left-0 top-0 h-full bg-red-500"
              style={{ width: "70%" }}
            ></div>
          </div>
          <div className="flex items-center space-x-2">
            <Rate className="my-4" allowHalf defaultValue={2.5} />
            <span className="font-medium">70%</span>
          </div>
        </div>
        <div className="my-5 flex items-center justify-between space-x-4">
          <div className="relative h-4 flex-1 overflow-hidden rounded-md bg-neutral-100">
            <div
              className="absolute left-0 top-0 h-full bg-red-500"
              style={{ width: "40%" }}
            ></div>
          </div>
          <div className="flex items-center space-x-2">
            <Rate className="my-4" allowHalf defaultValue={2.5} />
            <span className="font-medium">40%</span>
          </div>
        </div>
        <div className="my-5 flex items-center justify-between space-x-4">
          <div className="relative h-4 flex-1 overflow-hidden rounded-md bg-neutral-100">
            <div
              className="absolute left-0 top-0 h-full bg-red-500"
              style={{ width: "5%" }}
            ></div>
          </div>
          <div className="flex items-center space-x-2">
            <Rate className="my-4" allowHalf defaultValue={2.5} />
            <span className="font-medium">5%</span>
          </div>
        </div>
        <div className="my-5 flex items-center justify-between space-x-4">
          <div className="relative h-4 flex-1 overflow-hidden rounded-md bg-neutral-100">
            <div
              className="absolute left-0 top-0 h-full bg-red-500"
              style={{ width: "1%" }}
            ></div>
          </div>
          <div className="flex items-center space-x-2">
            <Rate className="my-4" allowHalf defaultValue={2.5} />
            <span className="font-medium">1%</span>
          </div>
        </div>
      </div>
      <div>
        <h1 className="my-10 text-2xl font-semibold">Student review</h1>
        <article className="bg-slate-200 px-6 py-3">
          <div className="flex items-center">
            <img
              className="mr-3 h-10 w-10 rounded-3xl"
              src="https://cdn-media.sforum.vn/storage/app/media/wp-content/uploads/2023/11/avatar-vo-tri-thumbnail.jpg"
              alt=""
            />
            <div>
              <span className="font-medium">John Doe</span>
              <br />
              <span className="text-sm font-light">2 hour ago</span>
            </div>
          </div>
          <Rate className="my-4" allowHalf defaultValue={2.5} />
          <p className="text-sm">
            Nam gravida elit a velit rutrum, eget dapibus ex elementum. Interdum
            et malesuada fames ac ante ipsum primis in faucibus. Fusce lacinia,
            nunc sit amet tincidunt venenatis.
          </p>
        </article>
      </div>
    </>
  );

  return (
    <div className="mt-5">
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
          Core knowledge
        </button>
        <button
          className={`text-[16px] font-medium text-black ${
            activeTab === "reviews" ? "border-b-2 border-[#ed2a26] p-2" : "p-2"
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>
      <div>
        {activeTab === "about" && <AboutTabContent />}
        {activeTab === "content" && <CourseContentTabContent />}
        {activeTab === "reviews" && <CourseReview />}
      </div>
    </div>
  );
};

export default CourseSubTab;
