const InstructorCard = () => {
  return (
    <article className="w-full cursor-pointer rounded-md bg-slate-200 drop-shadow-md hover:shadow-md">
      <div className="p-8">
        <div className="mb-5">
          <img
            className="m-auto h-24 w-24 rounded-full text-center"
            src="https://img-b.udemycdn.com/user/200_H/7799204_2091_5.jpg"
            alt=""
          />
        </div>
        <div className="mb-3 flex items-center justify-center">
          <h3 className="mr-2 text-base font-semibold">Jonas Schmedtmann</h3>
          <i className="fa-regular fa-circle-check text-sky-700"></i>
        </div>
        <p className="text-center font-extralight">Web development</p>
        <div className="m-auto mt-3 flex w-1/2 justify-between">
          <i className="fa-brands fa-square-facebook text-2xl text-blue-600"></i>
          <i className="fa-brands fa-square-x-twitter text-2xl"></i>
          <i className="fa-solid fa-link-slash text-2xl"></i>
          <i className="fa-brands fa-youtube text-2xl text-red-500"></i>
        </div>
        <p className="mt-3 text-center font-extralight">
          1M+ Students - 7 courses
        </p>
      </div>
    </article>
  );
};

export default InstructorCard;
