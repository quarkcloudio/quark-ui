import React, { useState, useEffect } from 'react';
import Render from '@/components/Render';
import { StatisticCard } from '@ant-design/pro-card';

const Statistic: React.FC<any> = (props:any) => {

  return (
    <StatisticCard {...props} />
  );
}

export default Statistic;