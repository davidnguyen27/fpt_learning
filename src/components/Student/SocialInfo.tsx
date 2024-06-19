import React, { useState } from 'react';
import { Modal } from 'antd';
import EditForm from './EditForm';

const SocialInfo: React.FC = () => {
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
    <div className="social-info">
      <h2>Thông tin mạng xã hội</h2>
      <div className="info-section">
        <div className="info-item" onClick={() => handleEditClick('Trang web cá nhân')}>
          <span>Trang web cá nhân</span>
          <span>Chưa cập nhật</span>
        </div>
        <div className="info-item" onClick={() => handleEditClick('GitHub')}>
          <span>GitHub</span>
          <span>Chưa cập nhật</span>
        </div>
      </div>
      <Modal title="Edit Information" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        {currentEditField && <EditForm field={currentEditField} onCancel={handleCancel} />}
      </Modal>
    </div>
  );
};

export default SocialInfo;
