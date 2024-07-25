import React, { useState } from "react";
import useCourseDetailClient from "../../hooks/course/useCourseDetailClient";

const CourseBox: React.FC<{ _id: string }> = ({ _id }) => {
  const [visible, setVisible] = useState(false);
  const { course, loading, error } = useCourseDetailClient(_id);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const showModal = () => setVisible(true);
  const handleOk = () => setVisible(false);

  return (
    <div className="p-4 text-black">
      <div className="-ml-5 -mr-3 -mt-5 flex bg-gray-800 p-8">
        <img
          className="max-w-lg cursor-pointer rounded-lg border-2 border-gray-500"
          src={course?.image_url || "/path/to/default-thumbnail.jpg"}
          alt="Course Thumbnail"
          onClick={showModal}
        />
        <div className="ml-4">
          <h2 className="mb-10 rounded text-2xl font-bold text-white">
            {course?.name}
          </h2>
          <p className="text-sm text-white">
            Description: {course?.description}
          </p>
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
      {visible && course?.video_url && (
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
                <source src={course?.video_url} type="video/mp4" />
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
