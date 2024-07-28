import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCourseDetailClient from "../../hooks/course/useCourseDetailClient";
import { StarFilled } from "@ant-design/icons";
import { Button, Modal, notification } from "antd";
import { createCartAPI, getCartsAPI } from "../../services/cartService";
import Loading from "../Loading/loading";
import { useAuth } from "../../app/context/AuthContext";
import { CartData, DataTransfer } from "../../models/Cart";

const CourseBox: React.FC<{ _id: string }> = ({ _id }) => {
  const [visible, setVisible] = useState(false);
  const { course, loading, error } = useCourseDetailClient(_id);
  const [isAddToCartModalVisible, setIsAddToCartModalVisible] =
    useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>("Add to cart");

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkCourseStatus = async () => {
      if (user && course) {
        try {
          const dataTransfer: DataTransfer = {
            searchCondition: {
              status: "",
              is_deleted: false,
            },
            pageInfo: { pageNum: 1, pageSize: 10 },
          };
          const carts: CartData[] = await getCartsAPI(dataTransfer);

          const cartItem = carts.find((cart) => cart.course_id === course._id);

          if (cartItem) {
            if (cartItem.status === "completed") {
              setButtonText("Learn Now");
            } else if (cartItem.status === "waiting_paid") {
              setButtonText("Check out now");
            } else {
              setButtonText("In Cart");
            }
          } else {
            setButtonText("Add to cart");
          }
        } catch (error: any) {
          console.error("Error fetching cart status:", error.message);
        }
      }
    };

    checkCourseStatus();
  }, [user, course]);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
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

      await createCartAPI({ course_id: course._id });
      notification.success({
        message: "Success",
        description: "Course added to cart successfully!",
        placement: "topRight",
      });
      setIsAddToCartModalVisible(false);
      setButtonText("Check out now");
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
      navigate(`/course/${course?._id}`);
    } else if (buttonText === "Check out now") {
      navigate("/confirm-checkout");
    } else if (buttonText === "Add to cart") {
      showAddToCartModal();
    }
  };

  return (
    <div className="bg-[#333333] p-4">
      <div className="flex rounded-lg p-8">
        <div className="relative">
          <img
            className="max-w-lg cursor-pointer border-4 border-white"
            src={course?.image_url || "/path/to/default-thumbnail.jpg"}
            alt="Course Thumbnail"
            onClick={showModal}
          />
          <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 px-2 py-1 text-center text-white">
            Preview this course
          </div>
        </div>
        <div className="ml-4 text-white">
          <h2 className="text-2xl font-bold">{course?.name}</h2>
          <p className="mt-2">{course?.description}</p>
          <div className="mt-4 flex items-center">
            <StarFilled className="text-yellow-500" />
            <span className="ml-2 text-lg text-yellow-500">
              {course?.average_rating}
            </span>
            <span className="ml-2 text-gray-300">
              ({course?.review_count} ratings)
            </span>
          </div>
          <p className="my-4">By {course?.instructor_name}</p>
          <p className="mb-4">
            Release date:{" "}
            {course?.created_at
              ? new Date(course.created_at).toLocaleDateString()
              : "N/A"}
          </p>
          <p className="mb-4">Category: {course?.category_name}</p>
          <span>Price: </span>
          <span
            className={`${course?.discount !== 0 ? "line-through" : ""} text-gray-400`}
          >
            ${course?.price}
          </span>
          <span className="ml-3 text-red-400">${course?.price_paid}</span>
          <div className="mt-4 flex space-x-2">
            <Button type="primary" danger onClick={handleButtonClick}>
              {buttonText}
            </Button>
          </div>
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
            ></span>
            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              <iframe
                width="560"
                height="315"
                src={course?.video_url}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>

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
      <Modal
        title="Add to Cart"
        visible={isAddToCartModalVisible}
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
