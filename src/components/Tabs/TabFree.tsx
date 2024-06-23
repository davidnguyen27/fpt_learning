import { Switch } from "antd";

const TabFree = () => {
  return (
    <div className="text-center">
      <div>
        <Switch />
        <span className="ml-4 font-medium">Require Login</span>
      </div>
      <div className="my-4">
        <Switch />
        <span className="ml-4 font-medium">Require Enroll</span>
      </div>
      <div>
        <p className="font-light">
          If the course is free, if student require to enroll your course, if
          not required enroll, if students required sign in to your website to
          take this course.
        </p>
      </div>
    </div>
  );
};

export default TabFree;
