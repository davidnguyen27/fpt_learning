import { Pie } from '@ant-design/plots';

const DonutChart: React.FC = () => {
  const data = [
    { type: 'Web', value: 10 },
    { type: 'Python', value: 3 },
    { type: 'Music', value: 3 },
    { type: 'Business', value: 3 },
    { type: 'Graphic Design', value: 4 },
    { type: 'Technology', value: 2 },
    { type: 'Marketing', value: 3 },
  ];

  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [{ type: 'element-active' }],
  };

  return <Pie {...config} />;
};

export default DonutChart;
