import React from "react";
import { CourseSubTabProps } from "../../models/Types";
import TableReviews from "../Tables/TableReviews";

const CourseSubTab: React.FC<CourseSubTabProps> = ({
  activeTab,
  setActiveTab,
  courseData,
}) => {
  const AboutTabContent = () => (
    <div>
      <h3 className="text-[#333333] text-[20px] font-medium">Requirement</h3>
      <div className="text-[14px] text-[#686f7a] font-normal space-y-3">
        <li>
          <span>Have a computer with Internet</span>
        </li>
        <li>
          <span>Be ready to learn an insane amount of awesome stuff</span>
        </li>
        <li>
          <span>Prepare to build real web apps!</span>
        </li>
      </div>
      <div className="mt-7">
        <h3 className="text-[20px] font-medium text-[#333333]">Description</h3>
        <span className="text-[16px] text-[#333333] font-medium mt-7">
          Just updated to include Bootstrap 4.1.3!
        </span>
        <p className="mt-6 text-[14px] font-normal text-[#686f7a]">
          Hi! Welcome to the Web Developer Bootcamp, the{" "}
          <strong className="font-medium ">
            only course you need to learn web development.
          </strong>{" "}
          There are a lot of options for online developer training, but this
          course is without a doubt the most comprehensive and effective on the
          market. Here's why:
        </p>
        <div className="text-[14px] font-normal text-[#686f7a] space-y-3">
          <li>
            <span>
              This is the only online course taught by a professional bootcamp
              instructor.
            </span>
          </li>
          <li>
            <span>
              94% of my in-person bootcamp students go on to get full-time
              developer jobs. Most of them are complete beginners when I start
              working with them.
            </span>
          </li>
          <li>
            <span>
              The previous 2 bootcamp programs that I taught cost $14,000 and
              $21,000. This course is just as comprehensive but with brand new
              content for a fraction of the price.
            </span>
          </li>
          <li>
            <span>
              Everything I cover is up-to-date and relevant to today's developer
              industry. No PHP or other dated technologies. This course does not
              cut any corners.
            </span>
          </li>
          <li>
            <span>
              This is the only complete beginner full-stack developer course
              that covers NodeJS.
            </span>
          </li>
          <li>
            <span>
              We build 13+ projects, including a gigantic production application
              called YelpCamp. No other course walks you through the creation of
              such a substantial application.
            </span>
          </li>
          <li>
            <span>
              The course is constantly updated with new content, projects, and
              modules. Think of it as a subscription to a never-ending supply of
              developer training.
            </span>
          </li>
          <p
            className="text-[14px] text-[#686f7a] font-normal"
            style={{ lineHeight: "1.8" }}
          >
            When you're learning to program you often have to sacrifice learning
            the exciting and current technologies in favor of the "beginner
            friendly" classes. With this course, you get the best of both
            worlds. This is a course designed for the complete beginner, yet it
            covers some of the most exciting and relevant topics in the
            industry.
          </p>
          <p className="py-2">
            Throughout the course we cover tons of tools and technologies
            including:
          </p>
          <div className="space-y-3 font-semibold">
            <li>
              <span>HTML5</span>
            </li>
            <li>
              <span>CSS3</span>
            </li>
            <li>
              <span>JavaScript</span>
            </li>
            <li>
              <span>Bootstrap 4</span>
            </li>
            <li>
              <span>SemanticUI</span>
            </li>
            <li>
              <span>DOM Manipulation</span>
            </li>
            <li>
              <span>jQuery</span>
            </li>
            <li>
              <span>HTML5</span>
            </li>
            <li>
              <span>CSS3</span>
            </li>
            <li>
              <span>JavaScript</span>
            </li>
            <li>
              <span>Bootstrap 4</span>
            </li>
            <li>
              <span>SemanticUI</span>
            </li>
            <li>
              <span>DOM Manipulation</span>
            </li>
            <li>
              <span>jQuery</span>
            </li>
          </div>
          <p
            className="text-[14px] text-[#686f7a] font-normal"
            style={{ lineHeight: "1.8" }}
          >
            This course is also unique in the way that it is structured and
            presented. Many online courses are just a long series of "watch as I
            code" videos. This course is different. I've incorporated everything
            I learned in my years of teaching to make this course not only more
            effective but more engaging. The course includes:
          </p>
          <div className="space-y-2">
            <li>
              <span>Lectures</span>
            </li>
            <li>
              <span>Code-Alongs</span>
            </li>
            <li>
              <span>Projects</span>
            </li>
            <li>
              <span>Exercises</span>
            </li>
            <li>
              <span>Research Assignments</span>
            </li>
            <li>
              <span>Slides</span>
            </li>
            <li>
              <span>Downloads</span>
            </li>
            <li>
              <span>Readings</span>
            </li>
          </div>
          <p
            className="text-[14px] text-[#686f7a] font-normal"
            style={{ lineHeight: "1.8" }}
          >
            If you have any questions, please don't hesitate to contact me. I
            got into this industry because I love working with people and
            helping students learn. Sign up today and see how fun, exciting, and
            rewarding web development can be!
          </p>
          <div>
            <h3 className="text-[20px] font-medium text-[#333333]">
              Who this course is for
            </h3>
            <div className="space-y-3">
              <li>
                <span>
                  This course is for anyone who wants to learn about web
                  development, regardless of previous experience
                </span>
              </li>
              <li>
                <span>
                  It's perfect for complete beginners with zero experience
                </span>
              </li>
              <li>
                <span>
                  It's also great for anyone who does have some experience in a
                  few of the technologies (like HTML and CSS) but not all
                </span>
              </li>
              <li>
                <span>
                  If you want to take ONE COURSE to learn everything you need to
                  know about web development, take this course
                </span>
              </li>
            </div>
          </div>
        </div>
      </div>
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
      <div className="flex justify-center border-b-2 border-gray-200 font-semibold space-x-4">
        <button
          className={`text-black font-medium text-[16px] ${
            activeTab === "about" ? "border-b-2 p-2 border-[#ed2a26]" : "p-2"
          }`}
          onClick={() => setActiveTab("about")}
        >
          About
        </button>
        <button
          className={`text-black font-medium text-[16px] ${
            activeTab === "content" ? "border-b-2 p-2 border-[#ed2a26]" : "p-2"
          }`}
          onClick={() => setActiveTab("content")}
        >
          Courses Content
        </button>
        <button
          className={`text-black font-medium text-[16px] ${
            activeTab === "reviews" ? "border-b-2 p-2 border-[#ed2a26]" : "p-2"
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
