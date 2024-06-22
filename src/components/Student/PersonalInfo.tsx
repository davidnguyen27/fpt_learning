import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal } from 'antd';
import EditForm from './EditForm';

interface UserProfile {
  fullName: string;
  email: string;
  dateOfBirth: string;
  address: string;
  phoneNumber: string;
  image: string;
  registrationDate: string;
  role: string;
  status: boolean;
  id: string;
}

interface EditFormProps {
  field: string;
  initialValue: string | boolean;
  onCancel: () => void;
  onSubmit: (updatedField: any) => void;
}

const PersonalInfo: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentEditField, setCurrentEditField] = useState<string | null>(null);
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Fetch data from MockAPI by role
    axios.get('https://665fc1c95425580055b0bf26.mockapi.io/users?role=student')
      .then(response => {
        setUserProfiles(response.data);
        // Set the first user as the selected user
        if (response.data.length > 0) {
          setSelectedUser(response.data[0]);
        }
      })
      .catch(error => {
        console.error("There was an error fetching the user profiles!", error);
      });
  }, []);

  const handleEditClick = (field: string) => {
    setCurrentEditField(field);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentEditField(null);
  };

  const handleFormCancel = () => {
    setIsModalVisible(false);
    setCurrentEditField(null);
  };

  const handleFormSubmit = (updatedField: any) => {
    // Update the selected user object with the new field value
    if (selectedUser) {
      setSelectedUser({
        ...selectedUser,
        [currentEditField as keyof UserProfile]: updatedField,
      });

      // Update data in the MockAPI
      axios.put(`https://665fc1c95425580055b0bf26.mockapi.io/users/${selectedUser.id}`, {
        [currentEditField as string]: updatedField,
      })
      .then(response => {
        console.log('Successfully updated:', response.data);
      })
      .catch(error => {
        console.error('Error updating:', error);
      });
    }

    setIsModalVisible(false);
    setCurrentEditField(null);
  };

  return (
    <div className="personal-info p-4">
      <h2 className="text-lg font-semibold mb-4">Thông tin cá nhân</h2>
      <div className="info-section bg-gray-100 p-4 rounded-lg">
        <div className="info-item flex justify-between mb-3 cursor-pointer" onClick={() => handleEditClick('fullName')}>
          <span>Full Name</span>
          <span>{selectedUser ? selectedUser.fullName : 'Loading...'}</span>
        </div>
        <hr className="border-t border-gray-300 w-full my-2" />
        <div className="info-item flex justify-between mb-3 cursor-pointer" onClick={() => handleEditClick('email')}>
          <span>Email</span>
          <span>{selectedUser ? selectedUser.email : 'Loading...'}</span>
        </div>
        <hr className="border-t border-gray-300 w-full my-2" />
        <div className="info-item flex justify-between mb-3 cursor-pointer" onClick={() => handleEditClick('address')}>
          <span>Address</span>
          <span>{selectedUser ? selectedUser.address : 'Loading...'}</span>
        </div>
        <hr className="border-t border-gray-300 w-full my-2" />
        <div className="info-item flex justify-between mb-3 cursor-pointer" onClick={() => handleEditClick('dateOfBirth')}>
          <span>Date of Birth</span>
          <span>{selectedUser ? selectedUser.dateOfBirth : 'Loading...'}</span>
        </div>
        <hr className="border-t border-gray-300 w-full my-2" />
        <div className="info-item flex justify-between mb-3 cursor-pointer" onClick={() => handleEditClick('phoneNumber')}>
          <span>Phone Number</span>
          <span>{selectedUser ? selectedUser.phoneNumber : 'Loading...'}</span>
        </div>
        <hr className="border-t border-gray-300 w-full my-2" />
        <div className="info-item flex items-center mb-3 cursor-pointer" onClick={() => handleEditClick('image')}>
          <span className="mr-2">Avatar</span>
          {selectedUser ? (
            <img src={selectedUser.image} alt="avatar" className="rounded-full h-10 w-10" />
          ) : (
            'Loading...'
          )}
        </div>
      </div>
      <Modal title="Edit Information" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        {currentEditField && (
          <EditForm
            field={currentEditField}
            initialValue={selectedUser ? selectedUser[currentEditField as keyof UserProfile] : ''}
            onCancel={handleFormCancel}
            onSubmit={handleFormSubmit}
          />
        )}
      </Modal>
    </div>
  );
};

export default PersonalInfo;
