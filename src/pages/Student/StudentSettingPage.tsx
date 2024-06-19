import React from 'react';
import { PersonalInfo, SideBar, SocialInfo } from '../../components';


const StudentSettingPage: React.FC = () => {
  return (
    <div className="student-setting flex h-screen">
      <div className="sider w-1 p-4 bg-gray-200">
        <SideBar />
      </div>
      <div className="content w-3 p-4">
        <PersonalInfo />
        <SocialInfo />
      </div>
    </div>
  );
};

export default StudentSettingPage;
