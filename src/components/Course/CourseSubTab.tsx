import React from "react";
import { CourseSubTabProps } from "../../models/Types";

const CourseSubTab: React.FC<CourseSubTabProps> = ({
  activeTab,
  setActiveTab,
  courseData,
}) => {
  const AboutTabContent = () => (
    <div>
      <h3 className="rounded font-semibold">Requirements</h3>
      <ul className="ml-4 list-disc rounded text-gray-700">
        <li>Have a computer with Internet</li>
        <li>Be ready to learn an insane amount of awesome stuff</li>
        <li>Prepare to build real web apps!</li>
      </ul>
      <h3 className="font-semibold">Description</h3>
      <ul className="ml-4 list-disc text-gray-700">
        <li>
          Just updated to include Bootstrap 4.1.3! Hi! Welcome to the Web
          Developer Bootcamp, the only course you need to learn web
          development...
        </li>
      </ul>
      <h3 className="font-semibold">Who this course is for</h3>
      <ul className="ml-4 list-disc text-gray-700">
        <li>
          This course is for anyone who wants to learn about web development,
          regardless of previous experience...
        </li>
      </ul>
      <h3>What you'll learn</h3>
      <ul className="ml-4 list-disc text-gray-700">
        <li>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          ultricies elit porttitor, ultrices enim a, commodo dolor...
        </li>
        <li>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          ultricies elit porttitor, ultrices enim a, commodo dolor...
        </li>
        <li>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          ultricies elit porttitor, ultrices enim a, commodo dolor...
        </li>
        <li>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          ultricies elit porttitor, ultrices enim a, commodo dolor...
        </li>
        <li>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          ultricies elit porttitor, ultrices enim a, commodo dolor...
        </li>
        <li>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          ultricies elit porttitor, ultrices enim a, commodo dolor...
        </li>
        <li>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          ultricies elit porttitor, ultrices enim a, commodo dolor...
        </li>
        <li>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          ultricies elit porttitor, ultrices enim a, commodo dolor...
        </li>
        <li>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          ultricies elit porttitor, ultrices enim a, commodo dolor...
        </li>
        <li>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          ultricies elit porttitor, ultrices enim a, commodo dolor...
        </li>
        <li>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          ultricies elit porttitor, ultrices enim a, commodo dolor...
        </li>
        <li>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          ultricies elit porttitor, ultrices enim a, commodo dolor...
        </li>
        <li>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          ultricies elit porttitor, ultrices enim a, commodo dolor...
        </li>
        <li>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          ultricies elit porttitor, ultrices enim a, commodo dolor...
        </li>
      </ul>
    </div>
  );

  const CourseContentTabContent = () => (
    <div>
      <h3>Course Content</h3>
      <ul className="ml-4 list-disc rounded text-gray-700">
        {courseData.content.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="mt-5">
      <div className="flex justify-center border-b-2 border-gray-200 font-semibold">
        <button
          type="button"
          className={`px-4 py-2 ${activeTab === "about" ? "bg-gray-200" : ""}`}
          onClick={() => setActiveTab("about")}
        >
          About
        </button>
        <button
          type="button"
          className={`px-4 py-2 ${activeTab === "content" ? "bg-gray-200" : ""}`}
          onClick={() => setActiveTab("content")}
        >
          Course Content
        </button>
        <button
          type="button"
          className={`px-4 py-2 ${activeTab === "reviews" ? "bg-gray-200" : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>
      <div>
        {activeTab === "about" && <AboutTabContent />}
        {activeTab === "content" && <CourseContentTabContent />}
      </div>
    </div>
  );
};

export default CourseSubTab;
