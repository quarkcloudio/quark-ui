import React, { useState, useEffect } from 'react';
import Render from '@/components/Render';
import { StatisticCard as AntStatisticCard } from '@ant-design/pro-card';

const StatisticCard: React.FC<any> = (props:any) => {

  return (
    <AntStatisticCard {...props} chart={<Render body={props.chart} callback={props.callback} />} />
  );
}

export default StatisticCard;