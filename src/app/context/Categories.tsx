import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Category } from '../../models/Types';

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios.get<Category[]>('https://6678548d0bd45250561e50ca.mockapi.io/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map(category => (
          <li key={category.categoryId}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
