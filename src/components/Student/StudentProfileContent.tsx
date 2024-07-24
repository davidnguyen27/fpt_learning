import { useState } from "react";
import StudentProfileBox from "./StudentProfileBox";
import StudentProfileSubTab from "./StudentSubTab";

const StudentProfileContent = () => {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="rounded-md bg-gray-300">
      <div className="rounded-md bg-gray-100">
        <StudentProfileBox />
        <StudentProfileSubTab
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </div>
  );
};

export default StudentProfileContent;
