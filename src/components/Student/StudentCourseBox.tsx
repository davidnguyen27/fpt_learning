import React, { useState } from "react";
import coursethumbnail from "../../assets/coursethumbnail.jpg";
import { CourseBoxProps } from "../../models/Types";

const StudentCourseBox: React.FC<CourseBoxProps> = ({ courseData }) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  return (
    <div className="p-5 text-black">
      <div className="flex flex-col items-center bg-gray-800 p-6 md:flex-row md:items-start md:p-12">
        <img
          className="mb-4 h-32 w-32 cursor-pointer rounded-lg border-4 border-gray-500 md:mb-0 md:h-48 md:w-48 lg:h-64 lg:w-64"
          src={coursethumbnail}
          alt="Course Thumbnail"
          onClick={showModal}
        />
        <div className="flex flex-col items-center text-center md:ml-4 md:items-start md:text-left">
          <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl lg:text-4xl">
            {courseData.title}
          </h2>
          <p className="mb-4 text-white">{courseData.description}</p>
          <div className="flex w-full space-x-4">
            <button
              type="button"
              className="flex-1 rounded bg-red-500 px-3 py-2 text-white hover:bg-red-700 md:px-4 md:py-3"
            >
              Cancel Subscription
            </button>
            <button
              type="button"
              className="flex-1 rounded border bg-gray-700 px-3 py-2 text-white hover:bg-red-500 md:px-4 md:py-3"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
      {visible && (
        <div
          className="fixed inset-0 z-10 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              ​
            </span>
            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              <video width="100%" controls>
                <source
                  src="https://youtu.be/wxxszUSs4Kk?si=Wptf4xdyVWEvu2vj"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
              <button
                type="button"
                className="m-2 rounded bg-red-500 p-2 text-white"
                onClick={handleOk}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentCourseBox;
