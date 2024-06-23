import React from "react";
import StudentCourseCard from "./StudentCourseCard";

interface StudentProfileSubTabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const StudentProfileSubTab: React.FC<StudentProfileSubTabProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const AboutTabContent = () => (
    <div>
      <h3 className="rounded font-semibold">Requirements</h3>
      <ul className="ml-7 list-disc rounded text-gray-700">
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
      </ul>
    </div>
  );

  const MyCourseSubTabContent = () => (
    <div>
      <div className="mb-2 mt-3 flex w-full justify-between">
        <h1 className="text-l font-semibold">Newest Courses</h1>
        <a
          href="/student-course-list-page"
          className="font-light hover:text-amber-600"
        >
          See all
        </a>
      </div>
      <div className="grid grid-cols-4 gap-3 rounded-md max-md:grid-cols-1 max-md:gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <StudentCourseCard key={index} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="mt-5">
      <div className="flex justify-self-end border-b-2 border-gray-200 font-semibold">
        <button
          type="button"
          className={`px-4 py-2 ${activeTab === "about" ? "bg-gray-200" : ""}`}
          onClick={() => setActiveTab("about")}
        >
          About
        </button>
        <button
          type="button"
          className={`px-4 py-2 ${activeTab === "myCourse" ? "bg-gray-200" : ""}`}
          onClick={() => setActiveTab("myCourse")}
        >
          My Courses
        </button>
      </div>
      <div>
        {activeTab === "about" && <AboutTabContent />}
        {activeTab === "myCourse" && <MyCourseSubTabContent />}
      </div>
    </div>
  );
};

export default StudentProfileSubTab;
