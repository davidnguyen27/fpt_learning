import React from 'react';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/redux/store';

const Loading: React.FC = () => {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  return (
    isLoading ?
    <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-100 z-50">
      <Spin size="large" />
    </div> : null
  );
};

export default Loading;
