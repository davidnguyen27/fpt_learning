import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Category } from '../../models/Types';

interface Course {
  id: string;
  thumbnail: string;
  title: string;
  categoryId: string;
  students: string[];
  price: string;
}

interface StudentCourseCardProps {
  courseData: Course;
}

const StudentCourseCard: React.FC<StudentCourseCardProps> = ({ courseData }) => {
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState<string>('');

  useEffect(() => {
    const fetchCategoryName = async () => {
      try {
        const response = await axios.get<Category>(`https://6678548d0bd45250561e50ca.mockapi.io/categories/${courseData.categoryId}`);
        setCategoryName(response.data.name);
      } catch (error) {
        console.error('Error fetching category:', error);
        setCategoryName('Unknown Category');
      }
    };

    fetchCategoryName();
  }, [courseData.categoryId]);

  return (
    <article
      className="h-auto w-auto cursor-pointer rounded-md bg-slate-200"
      onClick={() => navigate(`/view-detail/${courseData.id}`)}
    >
      <div className="p-4">
        <div>
          <img
            src={courseData.thumbnail}
            alt={courseData.title}
            className="w-full h-auto object-cover rounded"
          />
        </div>
        <div className="my-3 flex justify-between">
          <div>
            <i className="fa-solid fa-ellipsis-vertical cursor-pointer hover:text-amber-500"></i>
          </div>
        </div>
        <h3 className="font-semibold">{courseData.title}</h3>
        <div className="my-2">
          <span className="text-xs font-light">{categoryName}</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs">
            By <span className="font-medium">{courseData.students}</span>
          </p>
          <i className="fa-solid fa-cart-plus ml-14 cursor-pointer"></i>
          <span>${courseData.price}</span>
        </div>
      </div>
    </article>
  );
};

export default StudentCourseCard;
