import React from 'react';
import { DatePicker, Space } from 'antd';

const DateComponent=()=>{
const { RangePicker } = DatePicker;

return(
  <Space direction="vertical" size={15}>
    <RangePicker />
  </Space>
);
}

export default DateComponent;
