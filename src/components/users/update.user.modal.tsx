import { Input, Modal, message, notification } from 'antd';
import { useEffect, useState } from 'react';
import { IUsers } from './users.table';

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
    console.log('dataUpdate:', dataUpdate)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')
    const [address, setAddress] = useState('')
    const [role, setRole] = useState('')

    useEffect(() => {
        if (dataUpdate) {
            setName(dataUpdate.name)
            setEmail(dataUpdate.email)
            setPassword(dataUpdate.password)
            setAge(dataUpdate.age)
            setGender(dataUpdate.gender)
            setAddress(dataUpdate.address)
            setRole(dataUpdate.role)
        }
    }, [dataUpdate])

    const handleOk = async () => {
        setIsUpdateModalOpen(false);
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
    };

    const handleCloseCreateModal = () => {
        setDataUpdate(null)
        setIsUpdateModalOpen(false)
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
            title="Update A User"
            open={isUpdateModalOpen}
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
                    disabled
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

export default UpdateUserModal