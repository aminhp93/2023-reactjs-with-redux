import { useState } from 'react';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import { PostService } from 'services';
import CustomPlate from 'components/CustomPlate';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

export default function PostCreate() {
  const navigate = useNavigate();

  const [plateId, setPlateId] = useState(uuidv4());
  // const [note, setNote] = useState([
  //     {
  //       children: [{ text: '' }],
  //       type: 'p',
  //     },
  //   ]);

  const onFinish = async (values: any) => {
    try {
      console.log('Success:', values);
      const { title, description, body } = values;

      const dataCreate = {
        title,
        body: JSON.stringify(body),
        description,
      };
      await PostService.createPost(dataCreate);
      navigate('/post');
      notification.success({ message: 'Create success' });
    } catch (e) {
      notification.error({ message: 'Create failed' });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input your title!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: false, message: 'Please input your description!' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Body"
          name="body"
          rules={[{ required: false, message: 'Please input your body!' }]}
        >
          <CustomPlate
            id={String(plateId)}
            //   value={note}
            //   onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
