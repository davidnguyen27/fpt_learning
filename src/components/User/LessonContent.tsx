import useLessonClient from "../../hooks/lesson/useLessonClient";
import { extractYoutubeVideoId } from "../../utils/extractYoutube";

interface LessonContentProps {
  lessonId: string;
}

const LessonContent: React.FC<LessonContentProps> = ({ lessonId }) => {
  const { lesson } = useLessonClient(lessonId);

  let content;

  if (!lesson) {
    return <div>No lesson selected</div>;
  }

  switch (lesson.lesson_type) {
    case "video":
      const videoId = extractYoutubeVideoId(lesson.video_url);

      content = (
        <div className="h-[650px]">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      );
      break;

    case "text":
      content = (
        <div className="text-content p-4">
          <p dangerouslySetInnerHTML={{ __html: lesson.description }} />
        </div>
      );
      break;

    case "image":
      content = (
        <div className="image-content p-4">
          <img src={lesson.image_url} alt={lesson.name} />
        </div>
      );
      break;

    default:
      content = <div>No content available</div>;
  }

  return <div>{content}</div>;
};

export default LessonContent;
