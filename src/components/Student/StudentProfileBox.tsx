import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import axios for data fetching
import { StudentProfileData } from '../../models/Types';



const StudentProfileBox: React.FC = () => {
  const [studentProfileData, setStudentProfileData] = useState<StudentProfileData | null>(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      axios.get(`https://665fc1c95425580055b0bf26.mockapi.io/users/${userId}`)
        .then(response => {
          const userData = response.data;
          const profileData: StudentProfileData = {
            title: userData.fullName,
            description: userData.email,
            avatarUrl: userData.image,
            dateOfBirth: userData.dateOfBirth,
            address: userData.address,
            socialMedias: {
              facebook: userData.facebook,
              github: userData.github,
              // Add facebook here if available in the data
            }
          };
          setStudentProfileData(profileData);
        })
        .catch(error => {
          console.error("There was an error fetching the student profile!", error);
        });
    }
  }, []);

  const handleEdit = () => {
    navigate('/student-setting-page');
  };

  if (!studentProfileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-black p-5">
      <div className="bg-gray-800 p-6 flex flex-col md:flex-row items-center md:items-start rounded-lg">
        <img
          className="cursor-pointer w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full border-4 border-gray-500 mb-4"
          src={studentProfileData.avatarUrl || "https://i.pinimg.com/736x/18/2f/fe/182ffe44b2e0782e34370f6e21045825.jpg"}
          alt="Student Avatar"
        />
        <div className="md:ml-4 text-center md:text-left flex flex-col items-center md:items-start">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">{studentProfileData.title}</h2>
          <p className="text-white mb-4 max-w-md">{studentProfileData.description}</p> {/* Limited width */}
          <p className="text-white mb-4"><strong>Date of Birth:</strong> {studentProfileData.dateOfBirth}</p>
          <p className="text-white mb-4"><strong>Address:</strong> {studentProfileData.address}</p>
          <div className="flex space-x-4">
            {studentProfileData.socialMedias?.facebook && (
              <a href={studentProfileData.socialMedias.facebook} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook text-white text-2xl"></i>
              </a>
            )}
            {studentProfileData.socialMedias?.github && (
              <a href={studentProfileData.socialMedias.github} target="_blank" rel="noopener noreferrer">
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
    </div>
  );
};

export default StudentProfileBox;
