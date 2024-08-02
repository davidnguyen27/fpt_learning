import React from 'react';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/redux/store';
import { LoadingOutlined } from '@ant-design/icons';

const LoadingTop: React.FC = () => {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  return (
    isLoading ?
    <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-90 z-50 backdrop-blur-sm">
      <Spin indicator={<LoadingOutlined spin />} size="large" />
    </div> : null
  );
};

export default LoadingTop;
