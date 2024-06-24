import { Divider } from "antd";
import React from "react";

interface FormSubmitProps {
  prevStep: () => void;
}

const FormSubmit: React.FC<FormSubmitProps> = (props) => {
  const { prevStep } = props;

  return (
    <>
      <div className="flex items-center text-xl font-medium">
        <i className="fa-solid fa-arrow-up-from-bracket"></i>
        <span className="ml-3">Submit</span>
      </div>
      <Divider />
      <div className="bg-slate-200 px-6 py-6 text-center">
        <i className="fa-regular fa-pen-to-square text-2xl"></i>
        <p className="mt-4">
          Your course is in a draft state. Students cannot view, purchase or
          enroll in this course. For students that are already enrolled, this
          course will not appear on their student Dashboard.
        </p>
      </div>
      <div className="flex justify-between">
        <button
          className="mt-6 bg-red-500 px-10 py-3 hover:bg-red-600 text-white"
          onClick={prevStep}
        >
          Previous
        </button>
        <button className="mt-6 bg-red-500 px-10 py-3 hover:bg-red-600 text-white">
          Submit for Reviews
        </button>
      </div>
    </>
  );
};

export default FormSubmit;
