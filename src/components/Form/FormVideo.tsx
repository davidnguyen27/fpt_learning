import { Tabs, TabsProps } from "antd";
import { useState } from "react";
import TabHtml5 from "../Tabs/TabHtml5";
import TabExternalURL from "../Tabs/TabExternalURL";
import TabYouTube from "../Tabs/TabYouTube";
import TabVimeo from "../Tabs/TabVimeo";
import TabEmbedded from "../Tabs/TabEmbedded";

const FormVideo = () => {
  const [activeKey, setActiveKey] = useState<string>("1");

  const handleActive = (key: string) => {
    setActiveKey(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <div
          className={`mx-4 rounded-sm ${activeKey === "1" ? "bg-amber-500" : "bg-slate-200"} px-5 py-3`}
        >
          HTML5(mp4)
        </div>
      ),
      children: <TabHtml5 />,
    },
    {
      key: "2",
      label: (
        <div
          className={`mx-4 rounded-sm ${activeKey === "2" ? "bg-amber-500" : "bg-slate-200"} px-5 py-3`}
        >
          External URL
        </div>
      ),
      children: <TabExternalURL />,
    },
    {
      key: "3",
      label: (
        <div
          className={`mx-4 rounded-sm ${activeKey === "3" ? "bg-amber-500" : "bg-slate-200"} px-5 py-3`}
        >
          YouTube
        </div>
      ),
      children: <TabYouTube />,
    },
    {
      key: "4",
      label: (
        <div
          className={`mx-4 rounded-sm ${activeKey === "4" ? "bg-amber-500" : "bg-slate-200"} px-5 py-3`}
        >
          Vimeo
        </div>
      ),
      children: <TabVimeo />,
    },
    {
      key: "5",
      label: (
        <div
          className={`mx-4 rounded-sm ${activeKey === "5" ? "bg-amber-500" : "bg-slate-200"} px-5 py-3`}
        >
          Embedded
        </div>
      ),
      children: <TabEmbedded />,
    },
  ];

  return (
    <>
      <p>Select your preferred video type. (.mp4, YouTube, Vimeo etc.)</p>
      <Tabs
        defaultActiveKey="1"
        activeKey={activeKey}
        onChange={handleActive}
        items={items}
      />
    </>
  );
};

export default FormVideo;
