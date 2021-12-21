import React from 'react';
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const Uploading = () => {

  const UploadImg = {
    name: 'file',
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: percent => `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  return (
    <Upload {...UploadImg}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
}

export default Uploading;