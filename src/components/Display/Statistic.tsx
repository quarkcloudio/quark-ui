import React, { useState, useEffect } from 'react';
import { Statistic as AntStatistic } from 'antd';

const Statistic: React.FC<any> = (props:any) => {

  return (
    <AntStatistic {...props} />
  );
}

export default Statistic;