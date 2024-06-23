import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StudentCourseCard from './StudentCourseCard'; // Adjust the import path as needed
import { Course } from '../../models/Types';

// Assuming you have a way to get the logged-in user's ID, either from context or props
const loggedInUserId = '3'; // Replace with actual logged-in user ID retrieval mechanism

const StudentCourseListContent: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get<Course[]>('https://6678548d0bd45250561e50ca.mockapi.io/courses');
        const filteredCourses = response.data.filter(course => course.students.includes(loggedInUserId));
        setCourses(filteredCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {courses.map(course => (
        <StudentCourseCard key={course.id} courseData={course} />
      ))}
    </div>
  );
};

export default StudentCourseListContent;
