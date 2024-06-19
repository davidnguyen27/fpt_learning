import React from "react";
import avatar from "../assets/avt.png";
import { InstructorChannelProps } from "../../models/Types";

const InstructorChannel: React.FC<InstructorChannelProps> = ({
  instructor,
  students,
  likes,
  dislikes,
  shares,
}) => {
  return (
    <div className="mt-2 flex items-center justify-between">
      <div className="flex items-center">
        <img
          className="ml-5 h-14 w-14 rounded-full"
          src={avatar}
          alt="Instructor Avatar"
        />
        <div className="flex flex-col">
          <p className="text-l ml-4 rounded font-semibold text-black">
            {instructor}
          </p>
          <button
            type="button"
            className="ml-4 rounded bg-red-500 px-4 py-2 text-white"
          >
            Follow
          </button>
        </div>
      </div>
      <div className="mr-5 grid grid-cols-4 gap-4">
        <div className="flex flex-col items-center">
          <i className="fas fa-user fa-2x"></i>
          <p>{students}</p>
        </div>
        <div className="flex flex-col items-center">
          <i className="fas fa-thumbs-up fa-2x"></i>
          <p>{likes}</p>
        </div>
        <div className="flex flex-col items-center">
          <i className="fas fa-thumbs-down fa-2x"></i>
          <p>{dislikes}</p>
        </div>
        <div className="flex flex-col items-center">
          <i className="fas fa-share fa-2x"></i>
          <p>{shares}</p>
        </div>
      </div>
    </div>
  );
};

export default InstructorChannel;
