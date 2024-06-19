import { CourseHelpProps } from "../../models/Types";

const HelpBox: React.FC<CourseHelpProps> = ({ helpData }) => {
  return (
    <div className="p-5 text-black">
      <div className="-ml-5 -mr-3 -mt-5 flex items-center justify-center bg-gray-800 p-12">
        <div className="flex flex-col items-center">
          <h2 className="rounded text-2xl font-bold text-white">
            {helpData.title}
          </h2>
          <div className="styles-x-axis search-box">
            <input
              style={{ width: "85%" }}
              type="text"
              placeholder="Search for solutions"
              className="search-item mt-5"
            />
            <i className="fa-solid fa-magnifying-glass search-icon mt-5"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpBox;
