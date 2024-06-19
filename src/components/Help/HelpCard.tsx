import React from "react";
import { HelpCardProps } from "../../models/Types";

const HelpCard: React.FC<HelpCardProps> = ({
  iconClass,
  title,
  description,
}) => {
  return (
    <article className="ml-5 mt-10 w-72 cursor-pointer rounded-md bg-slate-200 drop-shadow-md">
      <div className="p-4 text-center">
        <div className="justify-items-center">
          <i className={iconClass}></i>
        </div>
        <h1 className="font-semibold">{title}</h1>
        <div className="my-2">
          <span className="text-xs font-light">{description}</span>
        </div>
      </div>
    </article>
  );
};

export default HelpCard;
