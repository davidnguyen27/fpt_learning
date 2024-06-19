import { useNavigate } from "react-router-dom";

const CourseCard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <article
      className="h-auto w-auto cursor-pointer rounded-md bg-slate-200"
      onClick={() => navigate("/detail")}
    >
      <div className="p-4">
        <div>
          <img
            src="https://miro.medium.com/v2/resize:fit:700/1*9ldWBjIm_36mNyNvJNCJgA.png"
            alt="Javascript"
          />
        </div>
        <div className="my-3 flex justify-between">
          <div>
            <span>1M Students</span>
          </div>
          <div>
            <i className="fa-solid fa-ellipsis-vertical cursor-pointer hover:text-amber-500"></i>
          </div>
        </div>
        <h3 className="font-semibold">
          The Complete Course Javascript Course 2024: From Zero to Expert!
        </h3>
        <div className="my-2">
          <span className="text-xs font-light">Web development</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs">
            By <span className="font-medium">Jonas Schmedtmann</span>
          </p>
          <i className="fa-solid fa-cart-plus ml-14 cursor-pointer"></i>
          <span>$20</span>
        </div>
      </div>
    </article>
  );
};

export default CourseCard;
