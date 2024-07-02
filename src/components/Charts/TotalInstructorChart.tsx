import { Line } from "@ant-design/plots";

const TotalInstructorChart = () => {
  const data = [
    { year: "2020", value: 20 },
    { year: "2021", value: 100 },
    { year: "2022", value: 188 },
    { year: "2023", value: 242 },
    { year: "2024", value: 300 },
  ];
  const config = {
    data,
    xField: "year",
    yField: "value",
    point: {
      shapeField: "square",
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
  };
  return <Line {...config} />;
};

export default TotalInstructorChart;
