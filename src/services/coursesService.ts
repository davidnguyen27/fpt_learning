import axios from "axios";

export const getCourses = async () => {
  const res = await axios.get(
    "https://665fc1c95425580055b0bf26.mockapi.io/courses",
  );
  return res.data;
};
