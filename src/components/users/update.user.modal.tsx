import { Input, Modal, message, notification, Form, Select, InputNumber, type FormProps } from 'antd';
import { useEffect, useState } from 'react';
import { IUsers } from './users.table';
const { Option } = Select;

interface IProps {
    access_token: string;
    getData: () => Promise<void>;
    isUpdateModalOpen: boolean;
    setIsUpdateModalOpen: (v: boolean) => void;
    dataUpdate: null | IUsers;
    setDataUpdate: any;
}

const UpdateUserModal = (props: IProps) => {

    const { access_token, getData, isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate } = props

    const [form] = Form.useForm();

    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({
                name: dataUpdate.name,
                email: dataUpdate.email,
                age: dataUpdate.age,
                gender: dataUpdate.gender,
                address: dataUpdate.address,
                role: dataUpdate.role
            })
        }
    }, [dataUpdate])

    // const handleOk = async () => {
    //     setIsUpdateModalOpen(false);
    //     const data = {
    //         _id: dataUpdate?._id, name, email, age, gender, address, role
    //     }
    //     const res = await fetch('http://localhost:8000/api/v1/users', {
    //         method: "PATCH",
    //         headers: {
    //             "Content-Type": "application/json",
    //             'Authorization': `Bearer ${access_token}`,
    //         },
    //         body: JSON.stringify(data),
    //     })
    //     const d = await res.json()
    //     if (d && d.data) {
    //         message.success(JSON.stringify(d.message))
    //         handleCloseCreateModal()
    //         await getData()
    //     } else {
    //         notification.error({
    //             message: 'Có lỗi xảy ra',
    //             description: JSON.stringify(d.message)
    //         })
    //     }
    // };

    const handleCloseCreateModal = () => {
        setDataUpdate(null)
        setIsUpdateModalOpen(false)
        form.resetFields()
    }

    // Form
    const onFinish: FormProps["onFinish"] = async (values) => {
        console.log('Success:', values);
        const { name, email, age, gender, address, role } = values
        if (dataUpdate) {
            const data = {
                _id: dataUpdate?._id, name, email, age, gender, address, role
            }
            const res = await fetch('http://localhost:8000/api/v1/users', {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${access_token}`,
                },
                body: JSON.stringify(data),
            })
            const d = await res.json()
            if (d && d.data) {
                message.success(JSON.stringify(d.message))
                handleCloseCreateModal()
                await getData()
            } else {
                notification.error({
                    message: 'Có lỗi xảy ra',
                    description: JSON.stringify(d.message)
                })
            }
        }
    };

    return (
        <Modal
            title="Update A User"
            open={isUpdateModalOpen}
            onOk={() => form.submit()}
            onCancel={() => handleCloseCreateModal()}
            maskClosable={false}
        >
            <Form
                form={form}
                name="basic"
                // labelCol={{ span: 8 }}
                // wrapperCol={{ span: 16 }}
                // style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                // autoComplete="off"
                layout="vertical"
            >
                <Form.Item
                    style={{ marginBottom: 5 }}
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: 5 }}
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input type='email' />
                </Form.Item>

                <Form.Item

                    style={{ marginBottom: 5 }}
                    label="Password"
                    name="password"
                    rules={[{ required: dataUpdate ? false : true, message: 'Please input your password!' }]}
                >
                    <Input.Password disabled={dataUpdate ? true : false} />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: 5 }}
                    label="Age"
                    name="age"
                    rules={[{ required: true, message: 'Please input your age!' }]}
                >
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: 5 }}
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: 'Please input your address!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item style={{ marginBottom: 5 }} name="gender" label="Gender" rules={[{ required: true }]}>
                    <Select
                        placeholder="Select a option and change input text above"
                        // onChange={onGenderChange}
                        allowClear
                    >
                        <Option value="male">male</Option>
                        <Option value="female">female</Option>
                        <Option value="other">other</Option>
                    </Select>
                </Form.Item>

                <Form.Item style={{ marginBottom: 5 }} name="role" label="Role" rules={[{ required: true }]}>
                    <Select
                        placeholder="Select a option and change input text above"
                        // onChange={onGenderChange}
                        allowClear
                    >
                        <Option value="user">USER</Option>
                        <Option value="admin">ADMIN</Option>
                    </Select>
                </Form.Item>

            </Form>
        </Modal>
    )
}

export default UpdateUserModal