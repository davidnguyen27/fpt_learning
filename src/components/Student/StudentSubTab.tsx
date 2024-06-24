import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Course } from '../../models/Types';

interface StudentProfileSubTabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userId: string | null; // Add userId prop
}

const StudentProfileSubTab: React.FC<StudentProfileSubTabProps> = ({
  activeTab,
  setActiveTab,
  userId,
}) => {
  const [studentCourses, setStudentCourses] = useState<Course[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentCourses = async () => {
      try {
        if (!userId) {
          console.log('No userId available');
          return; // Exit early if userId is not available
        }

        const response = await axios.get<Course[]>(`https://6678548d0bd45250561e50ca.mockapi.io/courses?studentId=${userId}`);
        const userCourses = response.data;
        console.log('Fetched courses:', userCourses); // Log fetched courses
        setStudentCourses(userCourses);
      } catch (error) {
        console.error('Error fetching student courses:', error);
      }
    };

    // Check if userId is available to fetch courses
    if (userId) {
      fetchStudentCourses();
    }
  }, [userId]);

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
        {/* Add more learning points as needed */}
      </ul>
    </div>
  );

  const MyCourseSubTabContent = () => (
    <div>
      <div className=" mt-3 mb-2 flex w-full justify-between">
        <h1 className="text-l font-semibold">My Courses</h1>
        <a href="/student-course-list-page" className="font-light hover:text-amber-600">
          See all
        </a>
      </div>
      <div className="rounded-md grid grid-cols-4 gap-3 max-md:grid-cols-1 max-md:gap-2">
        {studentCourses.length > 0 ? (
          studentCourses.map(course => (
            <div key={course.id} className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{course.description}</p>
              <div className="flex justify-between">
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 text-xs"
                  onClick={() => navigate(`/course/${course.id}`)}
                >
                  View
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No courses found.</p>
        )}
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
