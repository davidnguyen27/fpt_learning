interface StudentReviewProps {
  cmt: string;
  img: string;
  name: string;
}
const StudentReview: React.FC<StudentReviewProps> = (props) => {
  const { cmt, img, name } = props;
  return (
    <article className="w-full rounded-md bg-slate-200 drop-shadow-md">
      <div className="p-8">
        <p>{cmt}</p>
        <div className="mt-4 flex items-center">
          <img
            className="h-16 w-16 rounded-full object-cover"
            src={img}
            alt={name}
          />
          <h3 className="text-bold ml-3 font-semibold">{name}</h3>
        </div>
      </div>
    </article>
  );
};

export default StudentReview;
