// utils/extractYoutube.ts
export const extractYoutubeVideoId = (url: string): string | null => {
  if (!url || typeof url !== "string") {
    console.error("Invalid video URL:", url);
    return null;
  }
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};
