import React from 'react';
import { Pie } from '@ant-design/charts';

const InstructorPie: React.FC = () => {
  const data = [
    {
      type: 'Sales',
      value: 27,
    },
    {
      type: 'Courses',
      value: 25,
    },
    {
      type: 'Purchased',
      value: 18,
    },
    {
      type: 'Followers',
      value: 15,
    },
  ];

  const config = {
    forceFit: true,
    title: {
      visible: true,
      text: 'outer label',
    },
    description: {
      visible: true,
    },
    radius: 0.8,
    data,
    angleField: 'value',
    colorField: 'type',
    label: {
      visible: true,
      type: 'spider',
      offset: 20,
    },
  };

  return <Pie {...config} />;
};

export default InstructorPie;
