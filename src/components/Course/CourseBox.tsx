import React, { useState } from "react";
import coursethumbnail from "../../assets/coursethumbnail.jpg";
import coursevideo from "../../assets/coursevideo.mp4";
import { CourseBoxProps } from "../../models/Types";

const CourseBox: React.FC<CourseBoxProps> = ({ courseData }) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  return (
    <div className="p-5 text-black">
      <div className="-ml-5 -mr-3 -mt-5 flex bg-gray-800 p-12">
        <img
          className="w-64 cursor-pointer rounded-lg border-2 border-gray-500"
          src={coursethumbnail}
          alt="Course Thumbnail"
          onClick={showModal}
        />
        <div className="ml-4">
          <h2 className="rounded text-2xl font-bold text-white">
            {courseData.title}
          </h2>
          <p className="my-4 rounded text-white">{courseData.description}</p>
          <button
            type="button"
            className="mr-4 rounded bg-red-500 px-4 py-3 text-white hover:bg-red-700"
          >
            Add to Cart
          </button>
          <button
            type="button"
            className="rounded border bg-gray-700 px-4 py-3 text-white hover:bg-red-500"
          >
            Buy Now
          </button>
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

export default CourseBox;
