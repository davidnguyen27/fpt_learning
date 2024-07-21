import React from 'react';
import { Spin } from 'antd';

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-100 z-50">
      <Spin size="large" />
    </div>
  );
};

export default Loading;
