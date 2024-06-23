import { Pie } from "@ant-design/plots";

const InstructorChart = () => {
  const config = {
    data: [
      { type: "Courses", value: 27 },
      { type: "Students", value: 25 },
      { type: "Rating", value: 18 },
      // { type: "d", value: 15 },
      // { type: "e", value: 10 },
      // { type: "f", value: 5 },
    ],
    angleField: "value",
    colorField: "type",
    label: {
      text: "value",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: false,
        position: "right",
        rowPadding: 5,
      },
    },
  };
  return <Pie {...config} />;
};

export default InstructorChart;
