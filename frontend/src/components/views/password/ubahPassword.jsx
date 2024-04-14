'use client'
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import authService from '@/services/auth.service';
import useAuth from '@/hooks/useAuth';
import getTokenData from '@/lib/getTokenData';

const UbahPassword = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const { token } = useAuth()

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const newPassword = values.newPassword;
            const currentPassword = values.currentPassword;
            const payload = {
                currentPassword,
                newPassword,
            }
            // console.log(currentPassword);
            await authService.changePassword(token, payload).then((res) => {
                message.success('Password berhasil diubah!');
                form.resetFields();
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000);
            }).catch((error) => {
                message.error(error || 'Gagal mengubah password!');
            });
        } catch (error) {
            console.error('Error changing password:', error);
        }

        setLoading(false);
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
                                        label="Password Lama"
                                        rules={[
                                            { required: true, message: 'Masukan password lama!' },
                                        ]}
                                    >
                                        <Input.Password placeholder="Masukan dulu password lama" />
                                    </Form.Item>

                                    <Form.Item
                                        name="newPassword"
                                        label="Password Baru"
                                        rules={[
                                            { required: true, message: 'Masukan dulu password baru !' },
                                            { min: 6, message: 'Password minimal 6 karakter!' },
                                        ]}
                                    >
                                        <Input.Password placeholder="Masukan password baru" disabled={loading} />
                                    </Form.Item>

                                    <Form.Item
                                        name="confirmNewPassword"
                                        label="Konfirmasi password baru"
                                        dependencies={['newPassword']}
                                        rules={[
                                            { required: true, message: 'Masukan dulu konfirmasi password baru!' },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue('newPassword') === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject('Password tidak sama, silahkan ubah lagi password baru!');
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input.Password placeholder="Konfirmasi password baru" />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" loading={loading}>
                                            Ubah Password
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
