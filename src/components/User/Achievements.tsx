const Achievements: React.FC = () => {
  return (
    <section className="my-10">
      <div className="grid grid-cols-2 gap-x-7 gap-y-7 max-md:grid-cols-1">
        <article className="rounded-md bg-slate-200 p-4 drop-shadow-sm">
          <div className="mb-7 text-center text-2xl">
            <i className="fa-solid fa-display rounded-md bg-amber-500 p-6"></i>
          </div>
          <h3 className="text-center text-xl font-semibold">
            100,000+ online course
          </h3>
          <p className="text-center text-base font-extralight">
            Explore a variety of fresh topics
          </p>
        </article>
        <article className="rounded-md bg-slate-200 p-4 drop-shadow-sm">
          <div className="mb-7 text-center text-2xl">
            <i className="fa-solid fa-clock-rotate-left rounded-md bg-amber-500 p-6"></i>
          </div>
          <h3 className="text-center text-xl font-semibold">
            Go at your own pace
          </h3>
          <p className="text-center text-base font-extralight">
            Enjoy lifetime access to courses on Edututs+'s website
          </p>
        </article>
        <article className="rounded-md bg-slate-200 p-4 drop-shadow-sm">
          <div className="mb-7 text-center text-2xl">
            <i className="fa-solid fa-user-check rounded-md bg-amber-500 p-6"></i>
          </div>
          <h3 className="text-center text-xl font-semibold">
            Learn from industry experts
          </h3>
          <p className="text-center text-base font-extralight">
            Select from top instructors around the world
          </p>
        </article>
        <article className="rounded-md bg-slate-200 p-4 drop-shadow-sm">
          <div className="mb-7 text-center text-2xl">
            <i className="fa-regular fa-circle-play rounded-md bg-amber-500 p-6"></i>
          </div>
          <h3 className="text-center text-xl font-semibold">
            Find video courses on almost any topic
          </h3>
          <p className="text-center text-base font-extralight">
            Build your library for your career and personal growth
          </p>
        </article>
      </div>
    </section>
  );
};

export default Achievements;
