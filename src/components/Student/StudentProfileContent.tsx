import { useState } from "react";
import StudentProfileBox from "./StudentProfileBox";
import StudentProfileSubTab from "./StudentSubTab";

const StudentProfileContent = () => {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="m-3 rounded-md bg-gray-300 p-3">
      <div className="rounded-md bg-gray-100 p-1">
        <StudentProfileBox
          StudentProfileData={{
            title: "Tran Khanh Vinh",
            description: " I'm a dev",
            dateOfBirth: "24/08/2023",
            address: "vn",
            socialMedias: {
              facebook:
                "https://www.facebook.com/profile.php?id=100012301156428",
              github: "https://github.com/TK-Vinh",
            },
          }}
        />
        <StudentProfileSubTab
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </div>
  );
};

export default StudentProfileContent;
