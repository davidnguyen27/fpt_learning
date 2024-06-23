import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Course } from '../../models/Types';

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    axios.get<Course[]>('https://6678548d0bd45250561e50ca.mockapi.io//courses')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  return (
    <div>
      <h1>Courses</h1>
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <img src={course.thumbnail} alt={course.title} />
            <video controls src={course.video}></video>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;
