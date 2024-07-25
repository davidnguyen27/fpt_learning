import React, { useState } from "react";
import { CourseSubTabProps } from "../../models/Types";
import TableReviews from "../Tables/TableReviews";
import { MenuUnfoldOutlined, PlayCircleOutlined, EyeOutlined, LikeOutlined, DislikeOutlined, ShareAltOutlined } from "@ant-design/icons";
import useCourseDetailClient from "../../hooks/course/useCourseDetailClient";

const CourseSubTab: React.FC<CourseSubTabProps> = ({
  _id,
  activeTab,
  setActiveTab,
  sessions,
}) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { course } = useCourseDetailClient(_id);

  const handleSubscribeClick = () => {
    setIsSubscribed(!isSubscribed);
  };

  const AboutTabContent = () => (
    <div>
      <h3 className="text-[20px] font-medium text-[#333333]">Requirement</h3>
      <div className="space-y-3 text-[14px] font-normal text-[#686f7a]">
        <li>Have a computer with Internet</li>
        <li>Be ready to learn an insane amount of awesome stuff</li>
        <li>Prepare to build real web apps!</li>
      </div>
      <div className="mt-7">
        <h3 className="text-[20px] font-medium text-[#333333]">Description</h3>
        <span className="mt-7 text-[16px] font-medium text-[#333333]">
          Just updated to include Bootstrap 4.1.3!
        </span>
        <p className="mt-6 text-[14px] font-normal text-[#686f7a]">
          Hi! Welcome to the Web Developer Bootcamp, the{" "}
          <strong className="font-medium">
            only course you need to learn web development.
          </strong>{" "}
          There are a lot of options for online developer training, but this
          course is without a doubt the most comprehensive and effective on the
          market. Here's why:
        </p>
      </div>
    </div>
  );

  const CourseContentTabContent = () => (
    <div>
      {sessions.map((session) => (
        <div
          key={session._id}
          className="mt-6 rounded-md bg-slate-200 px-3 py-2"
        >
          <span className="text-sm font-bold">
            <MenuUnfoldOutlined />
          </span>{" "}
          <span>{session.name}</span>
          <div className="px-4 py-2">
            {session.lesson_list.map((lesson, idx) => (
              <span key={idx} className="ml-4 block">
                <PlayCircleOutlined /> {lesson.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="mt-5">
      <div className="py-2 px-4 pt-8">
        <div className="flex justify-between">
          <div className="flex items-center ml-1">
            <a href="#">
              <img
                src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/436257762_1831258874036043_7962583851360585901_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeFwSGYfZE8msByC8I97nfjowSj0rDZQ20DBKPSsNlDbQE9jTgn8CuJ0oWUNvpzlM8wnVxCPXT6LNA8QJLaMp7eP&_nc_ohc=BkqdrwZZLVAQ7kNvgEX9iPZ&_nc_ht=scontent.fsgn2-5.fna&oh=00_AYAG1xWT0LZY19MGUmWsvhnxuv6Y2Ui_WGhlPgdeNiDonQ&oe=66A7BF43"
                className="size-[50px] mr-4"
                alt="Profile"
              />
            </a>
            <div className="flex flex-col ">
              <a
                href="#"
                className="text-[16px] text-[#333333] font-medium mb-2"
              >
                {course?.instructor_name || 'Instructor Name Not Available'}
              </a>
              <button
                onClick={handleSubscribeClick}
                className={`px-3 py-2 text-white text-[14px] rounded-sm ${
                  isSubscribed ? 'bg-gray-600' : 'bg-red-600'
                }`}
              >
                {isSubscribed ? 'Subscribed' : 'Subscribe'}
              </button>
            </div>
          </div>
          <div className="flex mr-[200px] gap-1 ">
            <div className="flex flex-col items-center rounded-sm border px-5 py-3">
              <EyeOutlined className="size-[18px]" />
              <span className="mt-[5px]">1452</span>
            </div>
            <div className="flex flex-col items-center rounded-sm border px-5 py-3">
              <LikeOutlined className="size-[18px]" />
              <span className="mt-[5px]">100</span>
            </div>
            <div className="flex flex-col items-center rounded-sm border px-5 py-3">
              <DislikeOutlined className="size-[18px]" />
              <span className="mt-[5px]">20</span>
            </div>
            <div className="flex flex-col items-center rounded-sm border px-5 py-3">
              <ShareAltOutlined className="size-[18px]" />
              <span className="mt-[5px]">9</span>
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
        {activeTab === "reviews" && <TableReviews />}
      </div>
    </div>
  );
};

export default CourseSubTab;
