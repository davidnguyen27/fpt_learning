import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import coursevideo from "../../assets/coursevideo.mp4";
import { UserData } from "../../models/Types"; // Import UserData type

interface StudentProfileBoxProps {
  userData: UserData;
}

const StudentProfileBox: React.FC<StudentProfileBoxProps> = ({ userData }) => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleEdit = () => {
    navigate("/student-setting-page");
  };

  return (
    <div className="p-5 text-black">
      <div className="flex flex-col items-center rounded-lg bg-gray-800 p-6 md:flex-row md:items-start">
        <img
          className="mb-4 h-32 w-32 cursor-pointer rounded-full border-4 border-gray-500 md:h-48 md:w-48 lg:h-64 lg:w-64"
          src={
            userData.avatar ||
            "https://i.pinimg.com/736x/18/2f/fe/182ffe44b2e0782e34370f6e21045825.jpg"
          }
          alt="Student Avatar"
          onClick={showModal}
        />
        <div className="flex flex-col items-center text-center md:ml-4 md:items-start md:text-left">
          <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl lg:text-4xl">
            {userData.name}
          </h2>
          <p className="mb-4 max-w-md text-white">{userData.description}</p>
          <p className="mb-4 text-white">
            <strong>Date of Birth:</strong> {new Date(userData.dob).toLocaleDateString()}
          </p>
          
          
          <button
            className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
            onClick={handleEdit} // Add onClick handler
          >
            Edit
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
              onClick={handleOk}
            ></div>
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
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

export default StudentProfileBox;
