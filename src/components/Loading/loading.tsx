import React from "react";
import { Spin } from "antd";
import { useSelector } from "react-redux";

const Loading: React.FC = () => {
  const isLoading = useSelector((state: any) => state.loading.isLoading);

  return (
    <>
      {isLoading ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-100">
          <Spin size="large" />
        </div>
      ) : null}
    </>
  );
};

export default Loading;
