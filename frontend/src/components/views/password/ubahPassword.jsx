import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';

const UbahPassword = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        setLoading(true);
        setTimeout(() => {
            console.log('Received values:', values);
            setLoading(false);
            form.resetFields();
        }, 1000);
    };

    return (
        <div className="content-wrapper" id="guru">
            <section className="content">
                <div className="row">
                    <div className="col-md-12">
                        <div className="box box-solid box-primary">
                            <div className="box-header">
                                <h3 className="box-title">
                                    <i className="fa fa-key"></i>{' '}
                                    <span style={{ marginLeft: '10px' }}>
                                        Ubah Password
                                    </span>
                                </h3>
                            </div>
                            <div className="box-body">
                                <Form
                                    form={form}
                                    name="change_password_form"
                                    onFinish={onFinish}
                                    layout="vertical"
                                >
                                    <Form.Item
                                        name="currentPassword"
                                        label="Current Password"
                                        rules={[
                                            { required: true, message: 'Please enter your current password!' },
                                        ]}
                                    >
                                        <Input.Password placeholder="Enter current password" />
                                    </Form.Item>

                                    <Form.Item
                                        name="newPassword"
                                        label="New Password"
                                        rules={[
                                            { required: true, message: 'Please enter your new password!' },
                                            { min: 6, message: 'Password must be at least 6 characters!' },
                                        ]}
                                    >
                                        <Input.Password placeholder="Enter new password" />
                                    </Form.Item>

                                    <Form.Item
                                        name="confirmNewPassword"
                                        label="Confirm New Password"
                                        dependencies={['newPassword']}
                                        rules={[
                                            { required: true, message: 'Please confirm your new password!' },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue('newPassword') === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject('The two passwords do not match!');
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input.Password placeholder="Confirm new password" />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" loading={loading}>
                                            Change Password
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
};

export default UbahPassword;
