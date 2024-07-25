import React from "react";
import { CourseSubTabProps } from "../../models/Types";
import TableReviews from "../Tables/TableReviews";
import { MenuUnfoldOutlined, PlayCircleOutlined } from "@ant-design/icons";

const CourseSubTab: React.FC<CourseSubTabProps> = ({
  activeTab,
  setActiveTab,
  sessions,
}) => {
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
