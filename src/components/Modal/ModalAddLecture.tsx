import { Modal, Tabs, TabsProps } from "antd";
import React, { useState } from "react";
import FormBasic from "../Form/FormBasic";
import FormAttach from "../Form/FormAttach";
import FormVideo from "../Form/FormVideo";

interface ModalAddLectureProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalAddLecture: React.FC<ModalAddLectureProps> = (props) => {
  const { open, setOpen } = props;

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
          <i className="fa-regular fa-file-lines"></i> Basic
        </div>
      ),
      children: <FormBasic />,
    },
    {
      key: "2",
      label: (
        <div
          className={`mx-4 rounded-sm ${activeKey === "2" ? "bg-amber-500" : "bg-slate-200"} px-5 py-3`}
        >
          <i className="fa-solid fa-video"></i> Video
        </div>
      ),
      children: <FormVideo />,
    },
    {
      key: "3",
      label: (
        <div
          className={`mx-4 rounded-sm ${activeKey === "3" ? "bg-amber-500" : "bg-slate-200"} px-5 py-3`}
        >
          <i className="fa-solid fa-paperclip"></i> Attachments
        </div>
      ),
      children: <FormAttach />,
    },
  ];

  return (
    <Modal
      title="Add Lecture"
      open={open}
      onCancel={() => setOpen(false)}
      onOk={() => setOpen(false)}
      width={700}
      footer={[
        <button
          className="mr-2 rounded-md bg-zinc-300 px-4 py-2"
          onClick={() => setOpen(false)}
        >
          Close
        </button>,
        <button
          className="rounded-md bg-amber-500 px-4 py-2"
          onClick={() => setOpen(false)}
        >
          Add lecture
        </button>,
      ]}
    >
      <div className="form-video">
        <Tabs
          defaultActiveKey="1"
          activeKey={activeKey}
          onChange={handleActive}
          items={items}
        />
      </div>
    </Modal>
  );
};

export default ModalAddLecture;
