import { Input, Modal, message, notification } from 'antd';
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

    return (
        <Modal
            title="Add New User"
            open={isCreateModalOpen}
            onOk={handleOk}
            onCancel={() => handleCloseCreateModal()}
            maskClosable={false}
        >
            <div>
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
            </div>
        </Modal>
    )
}

export default CreateUserModal