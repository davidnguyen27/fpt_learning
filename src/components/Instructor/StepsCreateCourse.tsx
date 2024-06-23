import React, { useState } from "react";
import { Divider, Steps } from "antd";
import "../../styles/customStep.css";
import FormCreateCourse from "../Form/FormCreateCourse";
import FormCurriculum from "../Form/FormCurriculum";
import FormMedia from "../Form/FormMedia";
import FormCreatePrice from "../Form/FormCreatePrice";
import FormSubmit from "../Form/FormSubmit";

const StepsCreateCourse: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    setCurrent(current + 1);
  };

  const handlePrev = () => {
    setCurrent(current - 1);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <FormCreateCourse goToNextStep={handleNext} />;
      case 1:
        return (
          <FormCurriculum goToNextStep={handleNext} prevStep={handlePrev} />
        );
      case 2:
        return <FormMedia goToNextStep={handleNext} prevStep={handlePrev} />;
      case 3:
        return (
          <FormCreatePrice goToNextStep={handleNext} prevStep={handlePrev} />
        );
      case 4:
        return <FormSubmit prevStep={handlePrev} />;
      default:
        return null;
    }
  };

  const onChange = (value: number) => {
    setCurrent(value);
  };

  return (
    <>
      <Steps
        className="my-10"
        current={current}
        onChange={onChange}
        items={[
          {
            title: "Basic",
          },
          {
            title: "Curriculum",
          },
          {
            title: "Media",
          },
          {
            title: "Price",
          },
          {
            title: "Publish",
          },
        ]}
      />
      <Divider />

      <section>{renderStepContent(current)}</section>
    </>
  );
};

export default StepsCreateCourse;
