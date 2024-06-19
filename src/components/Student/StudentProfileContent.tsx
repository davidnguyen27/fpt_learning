import { useState } from "react";
import StudentProfileBox from "./StudentProfileBox";
import StudentProfileSubTab from "./StudentSubTab";

const StudentProfileContent = () => {
  const [activeTab, setActiveTab] = useState('about');

  return (
    <div className="p-3 m-3 bg-gray-300 rounded-md">
      <div className="p-1 bg-gray-100 rounded-md">
      <StudentProfileBox
        StudentProfileData={{
          title: "Tran Khanh Vinh",
          description: "I'm a developer",
          dateOfBirth: "24/08/2023",
          address: "vn",
          socialMedias: {
            facebook: "https://www.facebook.com/profile.php?id=100012301156428"
          }
        }}
      />
      <StudentProfileSubTab
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      </div>
    </div>
  );
}

export default StudentProfileContent;
