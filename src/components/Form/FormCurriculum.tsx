import { Divider } from "antd";
import React, { useState } from "react";
import ModalAddLecture from "../Modal/ModalAddLecture";

interface FormCurriculumProps {
  goToNextStep: () => void;
  prevStep: () => void;
}

const FormCurriculum: React.FC<FormCurriculumProps> = (props) => {
  const { goToNextStep, prevStep } = props;

  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <div className="flex items-center text-xl font-medium">
        <i className="fa-brands fa-leanpub"></i>
        <span className="ml-3">Curriculum</span>
      </div>
      <Divider />
      <div className="flex items-center justify-between bg-slate-200 px-4 py-3">
        <div className="flex items-center">
          <i className="fa-solid fa-list"></i>
          <span className="ml-2 text-base font-medium">Curriculum</span>
        </div>
        <button className="bg-red-500 text-white px-6 py-3 font-medium hover:bg-red-600">
          New Section
        </button>
      </div>
      <div className="mt-6 bg-slate-200 px-4 py-2">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center">
            <i className="fa-solid fa-bars"></i>
            <span className="ml-2 text-base font-medium">Introduction</span>
          </div>
          <div>
            <i className="fa-solid fa-pen-to-square mx-2 cursor-pointer"></i>
            <i className="fa-solid fa-trash-can mx-2 cursor-pointer"></i>
          </div>
        </div>
        <Divider />
        <div>
          <div className="my-3 cursor-pointer bg-neutral-100 px-4 py-3">
            <i className="fa-solid fa-section"></i>
            <span className="ml-3 text-base font-medium">Lecture Title</span>
          </div>
          <div className="my-3 cursor-pointer bg-neutral-100 px-4 py-3">
            <i className="fa-solid fa-pencil"></i>
            <span className="ml-3 text-base font-medium">Quiz Title</span>
          </div>
          <div className="my-3 cursor-pointer bg-neutral-100 px-4 py-3">
            <i className="fa-regular fa-file-lines"></i>
            <span className="ml-3 text-base font-medium">Assignment Title</span>
          </div>
        </div>
      </div>
      <div className="flex items-center bg-stone-900 py-2">
        <div className="mx-3 cursor-pointer text-slate-50" onClick={handleOpen}>
          <i className="fa-regular fa-square-plus"></i>
          <span className="ml-2 text-base font-medium">Lecture</span>
        </div>
        <ModalAddLecture open={open} setOpen={setOpen} />

        <div className="mx-3 cursor-pointer text-slate-50">
          <i className="fa-regular fa-square-plus"></i>
          <span className="ml-2 text-base font-medium">Quiz</span>
        </div>
        <div className="mx-3 cursor-pointer text-slate-50">
          <i className="fa-regular fa-square-plus"></i>
          <span className="ml-2 text-base font-medium">Assignment</span>
        </div>
      </div>
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

export default FormCurriculum;
