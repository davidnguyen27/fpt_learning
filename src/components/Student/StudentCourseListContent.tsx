import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StudentCourseCard from './StudentCourseCard'; // Adjust the import path as needed
import { Course, Category } from '../../models/Types';
import { useAuth } from '../../app/context/AuthContext';
// import '../../styles/StudentCourseListContent.css'; // Ensure you import the CSS file for custom styles

const StudentCourseListContent: React.FC = () => {
  const { user } = useAuth();
  const loggedInUserId = user?.id;

  const [courses, setCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCoursesAndCategories = async () => {
      try {
        const [coursesResponse, categoriesResponse] = await Promise.all([
          axios.get<Course[]>('https://6678548d0bd45250561e50ca.mockapi.io/courses'),
          axios.get<Category[]>('https://6678548d0bd45250561e50ca.mockapi.io/categories'),
        ]);

        if (loggedInUserId) {
          const userCourses = coursesResponse.data.filter(course => course.students.includes(loggedInUserId));
          setCourses(userCourses);
        }
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Error fetching courses or categories:', error);
      }
    };

    fetchCoursesAndCategories();
  }, [loggedInUserId]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? course.categoryId === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <div className="styles-x-axis search-box">
          <input
            type="text"
            placeholder="Search for courses, tutorials..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 border border-gray-300 rounded search-item"
            style={{ width: "100%" }}
          />
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
        </div>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="p-2 border border-gray-300 rounded category-select"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category.categoryId} value={category.categoryId}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredCourses.map(course => (
          <StudentCourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default StudentCourseListContent;
