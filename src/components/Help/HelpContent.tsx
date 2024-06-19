import { useState } from "react";
import { HelpBox, HelpSubTab } from "../../components";

const HelpContent = () => {
  const [activeTab, setActiveTab] = useState("instructor");
  return (
    <div>
      <HelpBox
        helpData={{
          title: "How may we help you?",
        }}
      />
      <HelpSubTab activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default HelpContent;
