import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCourseDetailClient from "../../hooks/course/useCourseDetailClient";
import { StarFilled } from "@ant-design/icons";
import { Button, Modal, notification } from "antd";
import { createCartAPI } from "../../services/cartService";
import Loading from "../Loading/loading";

const CourseBox: React.FC<{ _id: string }> = ({ _id }) => {
  const [visible, setVisible] = useState(false);
  const { course, loading, error } = useCourseDetailClient(_id);
  const [isAddToCartModalVisible, setIsAddToCartModalVisible] =
    useState<boolean>(false);
  const [isCourseInCart, setIsCourseInCart] = useState<boolean>(false);

  useEffect(() => {
    setIsCourseInCart(false);
  }, [_id]);

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

  const showAddToCartModal = () => setIsAddToCartModalVisible(true);
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
      setIsCourseInCart(true);
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: `Failed to add course to cart: ${error.message}`,
        placement: "topRight",
      });
    }
  };

  const extractYoutubeVideoId = (url: string) => {
    const regExp = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  return (
    <div className="bg-[#333333] p-4">
      <div className="flex rounded-lg p-8">
        <div className="relative" onClick={showModal}>
          <img
            className="max-w-lg cursor-pointer border-4 border-white"
            src={course?.image_url || "/path/to/default-thumbnail.jpg"}
            alt="Course Thumbnail"
          />
          <div className="absolute left-0 top-0 rounded-bl-md rounded-tr-md bg-orange-500 px-2 py-1 text-white">
            BESTSELLER
          </div>
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
          <div className="mt-4 flex space-x-2">
            {isCourseInCart ? (
              <Link to="/cart">
                <Button type="primary" danger>
                  Go to cart
                </Button>
              </Link>
            ) : (
              <Button type="primary" danger onClick={showAddToCartModal}>
                Add to cart
              </Button>
            )}
            <Button type="primary">Buy Now</Button>
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
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${extractYoutubeVideoId(
                  course.video_url
                )}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
