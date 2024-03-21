import { Input, Modal, message, notification, Button, Checkbox, Form, type FormProps, Select, InputNumber } from 'antd';
import { useEffect, useState } from 'react';

interface IProps {
    access_token: string;
    getData: () => Promise<void>;
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (v: boolean) => void;
}

const CreateUserModal = (props: IProps) => {

    const { access_token, getData, isCreateModalOpen, setIsCreateModalOpen } = props

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')
    const [address, setAddress] = useState('')
    const [role, setRole] = useState('')


    // const [form] = Form.useForm();

    const handleOk = async () => {
        setIsCreateModalOpen(false);
        const data = {
            name, email, password, age, gender, address, role
        }
        const res = await fetch('http://localhost:8000/api/v1/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${access_token}`,
            },
            body: JSON.stringify(data),
        })
        const d = await res.json()
        console.log('d:', d)
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
    };

    const handleCloseCreateModal = () => {
        setIsCreateModalOpen(false)
        setName('')
        setEmail('')
        setPassword('')
        setAge('')
        setGender('')
        setAddress('')
        setRole('')
    }

    // Form
    const onFinish: FormProps["onFinish"] = (values) => {
        console.log('Success:', values);
    };

    const { Option } = Select;

    // const onGenderChange = (value: string) => {
    //     switch (value) {
    //         case 'male':
    //             form.setFieldsValue({ note: 'Hi, man!' });
    //             break;
    //         case 'female':
    //             form.setFieldsValue({ note: 'Hi, lady!' });
    //             break;
    //         case 'other':
    //             form.setFieldsValue({ note: 'Hi there!' });
    //             break;
    //         default:
    //     }
    // };

    return (
        <Modal
            title="Add New User"
            open={isCreateModalOpen}
            onOk={handleOk}
            onCancel={() => handleCloseCreateModal()}
            maskClosable={false}
        >
            <Form
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
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input type='email' />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Age"
                    name="age"
                    rules={[{ required: true, message: 'Please input your age!' }]}
                >
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: 'Please input your address!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
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

                <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                    <Select
                        placeholder="Select a option and change input text above"
                        // onChange={onGenderChange}
                        allowClear
                    >
                        <Option value="user">USER</Option>
                        <Option value="admin">ADMIN</Option>
                    </Select>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            {/* <div>
                <label>Name:</label>
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label>Email:</label>
                <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label>Password:</label>
                <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <label>Age:</label>
                <Input
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
            </div>
            <div>
                <label>Gender:</label>
                <Input
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                />
            </div>
            <div>
                <label>Address:</label>
                <Input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            <div>
                <label>Role:</label>
                <Input
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                />
            </div> */}
        </Modal >
    )
}

export default CreateUserModal