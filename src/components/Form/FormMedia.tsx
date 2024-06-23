import { Divider, Tabs, TabsProps } from "antd";
import TabHtml5 from "../Tabs/TabHtml5";
import { useState } from "react";
import TabExternalURL from "../Tabs/TabExternalURL";
import TabYouTube from "../Tabs/TabYouTube";
import TabVimeo from "../Tabs/TabVimeo";
import TabEmbedded from "../Tabs/TabEmbedded";

interface FormMediaProps {
  goToNextStep: () => void;
  prevStep: () => void;
}

const FormMedia: React.FC<FormMediaProps> = (props) => {
  const { goToNextStep, prevStep } = props;

  const [activeKey, setActiveKey] = useState<string>("1");

  const handleActive = (key: string) => {
    setActiveKey(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <button
          className={`rounded-sm ${activeKey === "1" ? "bg-red-500 text-white" : "bg-slate-200"} px-5 py-3`}
        >
          HTML5(mp4)
        </button>
      ),
      children: <TabHtml5 />,
    },
    {
      key: "2",
      label: (
        <button
          className={`mx-4 rounded-sm ${activeKey === "2" ? "bg-red-500 text-white" : "bg-slate-200"} px-5 py-3`}
        >
          External URL
        </button>
      ),
      children: <TabExternalURL />,
    },
    {
      key: "3",
      label: (
        <button
          className={`mx-4 rounded-sm ${activeKey === "3" ? "bg-red-500 text-white" : "bg-slate-200"} px-5 py-3`}
        >
          YouTube
        </button>
      ),
      children: <TabYouTube />,
    },
    {
      key: "4",
      label: (
        <button
          className={`mx-4 rounded-sm ${activeKey === "4" ? "bg-red-500 text-white" : "bg-slate-200"} px-5 py-3`}
        >
          Vimeo
        </button>
      ),
      children: <TabVimeo />,
    },
    {
      key: "5",
      label: (
        <button
          className={`mx-4 rounded-sm ${activeKey === "5" ? "bg-red-500 text-white" : "bg-slate-200"} px-5 py-3`}
        >
          Embedded
        </button>
      ),
      children: <TabEmbedded />,
    },
  ];

  return (
    <>
      <div className="flex items-center text-xl font-medium">
        <i className="fa-regular fa-image"></i>
        <span className="ml-3">Media</span>
      </div>
      <Divider />
      <p className="my-4 font-normal">
        Intro Course overview provider type. (.mp4, YouTube, Vimeo etc.)
      </p>
      <Tabs
        defaultActiveKey="1"
        activeKey={activeKey}
        onChange={handleActive}
        items={items}
      />
      <div className="flex justify-between">
        <button
          className="mt-6 text-white bg-red-500 px-10 py-3 hover:bg-red-600"
          onClick={prevStep}
        >
          Previous
        </button>
        <button
          className="mt-6 text-white bg-red-500 px-10 py-3 hover:bg-red-600"
          onClick={goToNextStep}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default FormMedia;
