import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, notification, Rate } from "antd";
import { createCartAPI } from "../../services/cartService";
import { useAuth } from "../../app/context/AuthContext";
import useCourseDetailClient from "../../hooks/course/useCourseDetailClient";
import Loading from "../Loading/loading";
import { extractYoutubeVideoId } from "../../utils/extractYoutube";

const CourseBox: React.FC<{ _id: string }> = ({ _id }) => {
  const { course, loading, error, setCourse } = useCourseDetailClient(_id);
  const [isAddToCartModalVisible, setIsAddToCartModalVisible] =
    useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>("Add to cart");
  const [visible, setVisible] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (course) {
      if (course.is_in_cart) {
        if (course.is_purchased) {
          setButtonText("Learn Now");
        } else {
          setButtonText("Go to cart");
        }
      } else {
        setButtonText("Add to cart");
      }
    }
  }, [course]);

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error) return <div>{error}</div>;

  const showModal = () => setVisible(true);
  const handleOk = () => setVisible(false);

  const showAddToCartModal = () => {
    if (!user) {
      notification.info({
        message: "Please login",
        description: "Please login to add this course to cart.",
        placement: "topRight",
      });
      navigate("/sign-in");
    } else {
      setIsAddToCartModalVisible(true);
    }
  };

  const handleAddToCartCancel = () => setIsAddToCartModalVisible(false);

  const handleAddToCartOk = async () => {
    try {
      if (!course) throw new Error("No course data available!");

      // Call API to add course to cart
      await createCartAPI({ course_id: course._id });

      // Update UI state
      setCourse((prevCourse) =>
        prevCourse ? { ...prevCourse, is_in_cart: true } : null,
      );

      notification.success({
        message: "Success",
        description: "Course added to cart successfully!",
        placement: "topRight",
      });
      setIsAddToCartModalVisible(false);

      setButtonText("Go to cart");
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: `Failed to add course to cart: ${error.message}`,
        placement: "topRight",
      });
    }
  };

  const handleButtonClick = () => {
    if (buttonText === "Learn Now") {
      navigate(`/learning/${course?._id}`);
    } else if (buttonText === "Go to cart") {
      navigate("/cart");
    } else if (buttonText === "Add to cart") {
      showAddToCartModal();
    }
  };

  return (
    <div className="bg-[#333333] p-4">
      <div className="flex flex-col rounded-lg p-4 md:flex-row md:p-8">
        <div
          className="relative mb-4 w-full cursor-pointer md:mb-0 md:w-1/2 lg:w-1/3"
          onClick={showModal}
        >
          <img
            className="w-full h-64 border-4 border-white object-cover"
            src={course?.image_url || "/path/to/default-thumbnail.jpg"}
            alt="Course Thumbnail"
          />
          <div className="absolute left-0 w-full bg-black bg-opacity-50 px-2 py-1 text-center text-white">
            Preview this course
          </div>
        </div>
        <div className="ml-0 text-white md:ml-4 md:w-1/2 lg:w-2/3">
          <h2 className="text-xl font-bold md:text-2xl">{course?.name}</h2>
          <p className="mt-2 text-sm md:text-base">{course?.description}</p>
          <div className="mt-4 flex items-center">
            <Rate
              disabled
              value={course?.average_rating}
              className="text-sm md:text-base"
            />
            <span className="ml-2 text-sm text-gray-300 md:text-base">
              ({course?.review_count} ratings)
            </span>
          </div>
          <p className="my-2 text-sm md:my-4 md:text-base">
            By: {course?.instructor_name}
          </p>
          <p className="mb-2 text-sm md:mb-4 md:text-base">
            Category: {course?.category_name}
          </p>
          <p className="mb-2 text-sm md:mb-4 md:text-base">
            Release date:{" "}
            {course?.created_at
              ? new Date(course.created_at).toLocaleDateString()
              : "N/A"}
          </p>
          <p className="mb-2 text-sm md:mb-4 md:text-base">
            Duration: {course?.full_time} hours
          </p>
          <div className="mb-4">
            <span className="text-sm md:text-base">Price: </span>
            <span
              className={`${
                course?.discount !== 0 ? "line-through" : ""
              } text-sm text-gray-400 md:text-base`}
            >
              ${course?.price}
            </span>
            <span className="ml-3 text-sm text-red-400 md:text-base">
              ${course?.price_paid}
            </span>
          </div>
          <div className="mt-4 flex space-x-2">
            <Button
              type="primary"
              danger
              onClick={handleButtonClick}
              className="text-sm md:text-base"
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </div>

      {/* Modal for video preview */}
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
            ></span>
            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  className="w-full"
                  src={`https://www.youtube.com/embed/${extractYoutubeVideoId(course.video_url)}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
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

      {/* Modal for adding to cart */}
      <Modal
        title="Add to Cart"
        open={isAddToCartModalVisible}
        onOk={handleAddToCartOk}
        onCancel={handleAddToCartCancel}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to add this course to cart?</p>
      </Modal>
    </div>
  );
};

export default CourseBox;
