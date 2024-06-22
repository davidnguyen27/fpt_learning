import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import coursevideo from '../../assets/coursevideo.mp4';

interface StudentProfileData {
  title: string;
  description: string;
  avatarUrl?: string; // Optional URL for the avatar image
  dateOfBirth: string;
  socialMedias?: { // Make socialMedias optional
    facebook?: string;
    linkedin?: string;
    github?: string;
  };
  address: string;
}

interface StudentProfileBoxProps {
  StudentProfileData: StudentProfileData;
}

const StudentProfileBox: React.FC<StudentProfileBoxProps> = ({ StudentProfileData }) => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleEdit = () => {
    navigate('/student-setting-page');
  };

  return (
    <div className="text-black p-5">
      <div className="bg-gray-800 p-6 flex flex-col md:flex-row items-center md:items-start rounded-lg">
        <img
          className="cursor-pointer w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full border-4 border-gray-500 mb-4"
          src={StudentProfileData.avatarUrl || "https://i.pinimg.com/736x/18/2f/fe/182ffe44b2e0782e34370f6e21045825.jpg"}
          alt="Student Avatar"
          onClick={showModal}
        />
        <div className="md:ml-4 text-center md:text-left flex flex-col items-center md:items-start">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">{StudentProfileData.title}</h2>
          <p className="text-white mb-4 max-w-md">{StudentProfileData.description}</p> {/* Limited width */}
          <p className="text-white mb-4"><strong>Date of Birth:</strong> {StudentProfileData.dateOfBirth}</p>
          <p className="text-white mb-4"><strong>Address:</strong> {StudentProfileData.address}</p>
          <div className="flex space-x-4">
            {StudentProfileData.socialMedias?.facebook && (
              <a href={StudentProfileData.socialMedias.facebook} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook text-white text-2xl"></i>
              </a>
            )}
            {StudentProfileData.socialMedias?.linkedin && (
              <a href={StudentProfileData.socialMedias.linkedin} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin text-white text-2xl"></i>
              </a>
            )}
            {StudentProfileData.socialMedias?.github && (
              <a href={StudentProfileData.socialMedias.github} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github text-white text-2xl"></i>
              </a>
            )}
          </div>
          <button 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={handleEdit} // Add onClick handler
          >
            Edit
          </button>
        </div>
      </div>
      
      {visible && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
              onClick={handleOk}
            ></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <video width="100%" controls>
                <source src={coursevideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <button type="button" className="m-2 p-2 bg-red-500 text-white rounded" onClick={handleOk}>
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
