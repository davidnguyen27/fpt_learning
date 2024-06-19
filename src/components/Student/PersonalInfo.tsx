import React, { useState } from 'react';
import { Modal } from 'antd';
import EditForm from './EditForm';

const PersonalInfo: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentEditField, setCurrentEditField] = useState<string | null>(null);

  const handleEditClick = (field: string) => {
    setCurrentEditField(field);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentEditField(null);
  };

  return (
    <div className="personal-info p-4">
      <h2 className="text-lg font-semibold mb-4">Thông tin cá nhân</h2>
      <div className="info-section bg-gray-100 p-4 rounded-lg">
        <div className="info-item flex justify-between mb-3 cursor-pointer" onClick={() => handleEditClick('Họ và tên')}>
          <span>Họ và tên</span>
          <span>Tran Khanh Vinh</span>
        </div>
        <hr className="border-t border-gray-300 w-full my-2" />
        <div className="info-item flex justify-between mb-3 cursor-pointer" onClick={() => handleEditClick('Tên người dùng')}>
          <span>Tên người dùng</span>
          <span>vinhtrankhanh</span>
        </div>
        <hr className="border-t border-gray-300 w-full my-2" />
        <div className="info-item flex justify-between mb-3 cursor-pointer" onClick={() => handleEditClick('Giới thiệu')}>
          <span>Giới thiệu</span>
          <span>Chưa cập nhật</span>
        </div>
        <hr className="border-t border-gray-300 w-full my-2" />
        <div className="info-item flex justify-between mb-3 cursor-pointer" onClick={() => handleEditClick('Địa chỉ')}>
          <span>Địa chỉ</span>
          <span>Chưa cập nhật</span>
        </div>
        <hr className="border-t border-gray-300 w-full my-2" />
        <div className="info-item flex justify-between mb-3 cursor-pointer" onClick={() => handleEditClick('Ngày sinh')}>
          <span>Ngày sinh</span>
          <span>Chưa cập nhật</span>
        </div>
        <hr className="border-t border-gray-300 w-full my-2" />
        <div className="info-item flex justify-between cursor-pointer" onClick={() => handleEditClick('Ảnh đại diện')}>
          <span>Ảnh đại diện</span>
          <img src="https://via.placeholder.com/150" alt="avatar" className="rounded-full" />
        </div>
      </div>
      <Modal title="Edit Information" open={isModalVisible} onCancel={handleCancel} footer={null}>
        {currentEditField && <EditForm field={currentEditField} onCancel={handleCancel} />}
      </Modal>
    </div>
  );
};

export default PersonalInfo;
