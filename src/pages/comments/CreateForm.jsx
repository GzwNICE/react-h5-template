import React from 'react';
import { Form, Input, Modal } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

const CreateForm = props => {
  const { modalVisible, form, current, onAdd, onEdit, onModalVisible } = props;

  const handleOk = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      if (fieldsValue.id) {
        onEdit(fieldsValue);
      } else {
        delete fieldsValue.id;
        onAdd(fieldsValue);
      }
      form.resetFields();
    });
  };

  return (
    <Modal
      destroyOnClose
      title={current.id ? '编辑评论' : '新建评论'}
      visible={modalVisible}
      maskClosable={false}
      onOk={handleOk}
      onCancel={() => onModalVisible()}
    >
      {form.getFieldDecorator('id', {
        initialValue: current.id || '',
      })(<Input type="hidden" />)}

      {form.getFieldDecorator('postId', {
        initialValue: current.postId || '',
      })(<Input type="hidden" />)}

      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="名称">
        {form.getFieldDecorator('name', {
          initialValue: current.name || [],
          rules: [{ required: true, message: '请输入名称！' }],
        })(<Input placeholder="请输入名称" />)}
      </FormItem>

      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="email">
        {form.getFieldDecorator('email', {
          initialValue: current.email || '',
          rules: [{ required: true, type: 'email', message: '请输入email！' }],
        })(<Input placeholder="请输入email" />)}
      </FormItem>

      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="内容">
        {form.getFieldDecorator('body', {
          initialValue: current.body || '',
          rules: [{ required: true, message: '请输入内容！' }],
        })(<TextArea rows={4} placeholder="请输入内容" />)}
      </FormItem>
    </Modal>
  );
};

export default Form.create()(CreateForm);
