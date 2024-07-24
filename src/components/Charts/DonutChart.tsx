import { Pie } from '@ant-design/plots';

const DonutChart: React.FC = () => {
  const data = [
    { type: 'Web', value: 257 },
    { type: 'Python', value: 251 },
    { type: 'Math', value: 152 },
    { type: 'Business', value: 232 },
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
