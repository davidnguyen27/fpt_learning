import React from 'react';
import spinner from '../../assets/spinner.gif'; // Đảm bảo tệp GIF ở đúng đường dẫn này

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-100 z-50">
      <img src={spinner} alt="Loading..." className="w-80" 
      />
    </div>
  );
};

export default Loading;
