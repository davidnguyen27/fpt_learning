const TabYouTube = () => {
  return (
    <>
      <p>
        YouTube URL <span className="text-red-600">*</span>
      </p>
      <input
        type="text"
        placeholder="YouTube Video URL"
        className="mb-4 w-full px-5 py-2 outline-none"
      />
      <p>
        Course thumbnail <span className="text-red-600">*</span>
      </p>
      <div className="h-80 w-2/5 rounded-md bg-slate-200 px-4 py-3">
        <div className="bg-slate-100 px-6 py-16 text-center">
          <i className="fa-regular fa-image text-3xl"></i>
        </div>
        <div className="mt-6 flex flex-col items-center justify-center">
          <label className="inline-block cursor-pointer border-2 border-solid border-amber-500 px-4 py-2">
            CHOOSE THUMBNAIL
            <input type="file" accept=".jpg, .jpeg, .png" className="hidden" />
          </label>
          <span className="mt-3 block text-center text-sm font-light">
            Size: 590x300 pixels. Supports: jpg, jpeg or png
          </span>
        </div>
      </div>
    </>
  );
};

export default TabYouTube;
