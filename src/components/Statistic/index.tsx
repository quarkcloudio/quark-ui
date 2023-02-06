import React from 'react';
import { Statistic as AntStatistic, StatisticProps } from 'antd';

const Statistic: React.FC<StatisticProps> = (props) => {
  return <AntStatistic {...props} />;
};

export default Statistic;
