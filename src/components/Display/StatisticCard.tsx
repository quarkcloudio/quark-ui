import React, { useState, useEffect } from 'react';
import { StatisticCard as AntStatisticCard } from '@ant-design/pro-card';

const StatisticCard: React.FC<any> = (props:any) => {

  return (
    <AntStatisticCard {...props} />
  );
}

export default StatisticCard;