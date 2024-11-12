import React, { useState } from "react";
import "./App.css";
import { Button, Form, Input, notification } from "antd";
import {  toast } from 'react-toastify';
import axios from 'axios';
const Context = React.createContext({
  name: 'Default',
});

function App() {
  const [form] = Form.useForm();
  const [fileChange, setFileChange] = useState(null);
  const [api, contextHolder] = notification.useNotification();
  const onFinish = async(data) => {
    console.log(fileChange);
    
    const formData = new FormData();
    formData.append('classStudent', data?.classStudent);
    formData.append('code', data?.code);
    formData.append('name', data?.name);
    formData.append('file', fileChange?.target?.files[0]);
    setFileChange(null);
  
    
    const apiResponse = await axios.post("http://localhost:8080/api/create", formData);
    if(apiResponse) {
      
      toast.success("Thu bài thành công!")
    }
    form.resetFields();
    
  };

  const normFile = (e) => {
    // Ensure fileList is always an array
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList || [];
  };

  return (
    <>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <h3>Nộp bài Online</h3>
        
        <Form.Item
          label="Họ và tên sinh viên"
          name="name"
          rules={[{ required: true, message: "Vui lòng điền tên sinh viên" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mã sinh viên"
          name="code"
          rules={[{ required: true, message: "Vui lòng điền mã sinh viên" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Lớp"
          name="classStudent"
          rules={[{ required: true, message: "Vui lòng điền lớp sinh viên" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Chọn file"
          name="file"
          valuePropName="fileList"
          
          rules={[{ required: true, message: "Vui lòng chọn file" }]}
        >
          <input type="file" name="file" onChange={(file) => setFileChange(file)}></input>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button htmlType="submit" type="primary">Nộp bài</Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default App;
