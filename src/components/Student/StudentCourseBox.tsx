import React, { useState } from "react";
import coursethumbnail from "../../assets/coursethumbnail.jpg";
import coursevideo from "../../assets/coursevideo.mp4";
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
      <div className="flex flex-col md:flex-row items-center md:items-start bg-gray-800 p-6 md:p-12">
        <img
          className="cursor-pointer w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-lg border-4 border-gray-500 mb-4 md:mb-0"
          src={coursethumbnail}
          alt="Course Thumbnail"
          onClick={showModal}
        />
        <div className="md:ml-4 text-center md:text-left flex flex-col items-center md:items-start">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            {courseData.title}
          </h2>
          <p className="text-white mb-4">{courseData.description}</p>
          <div className="flex space-x-4 w-full">
            <button
              type="button"
              className="flex-1 py-2 md:py-3 px-3 md:px-4 bg-red-500 text-white rounded hover:bg-red-700"
            >
              Cancel Subscription
            </button>
            <button
              type="button"
              className="flex-1 py-2 md:py-3 px-3 md:px-4 bg-gray-700 text-white rounded border hover:bg-red-500"
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
                <source src={coursevideo} type="video/mp4" />
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
