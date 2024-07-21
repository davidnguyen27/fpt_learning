import { Line } from '@ant-design/plots';

const LineChart: React.FC = () => {
  const data = [
    { month: 'Jan', value: 0 },
    { month: 'Feb', value: 50 },
    { month: 'Mar', value: 70 },
    { month: 'Apr', value: 90 },
    { month: 'May', value: 90 },
    { month: 'Jun', value: 110 },
    { month: 'Jul', value: 100 },
    { month: 'Aug', value: 130 },
    { month: 'Sep', value: 60 },
    { month: 'Oct', value: 90 },
    { month: 'Nov', value: 120 },
    { month: 'Dec', value: 110 },
  ];

  const config = {
    data,
    xField: 'month',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
    tooltip: {
      showMarkers: false,
    },
    smooth: true,
    style: {
      lineWidth: 2,
    },
  };

  return <Line {...config} />;
};

export default LineChart;
