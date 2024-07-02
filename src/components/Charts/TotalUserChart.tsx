import { Line } from "@ant-design/plots";

const TotalUserChart = () => {
  const data = [
    { year: "2020", value: 500 },
    { year: "2021", value: 1100 },
    { year: "2022", value: 1248 },
    { year: "2023", value: 1500 },
    { year: "2024", value: 1625 },
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

export default TotalUserChart;
