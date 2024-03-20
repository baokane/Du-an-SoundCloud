import { useEffect, useState } from 'react'
import { Button, Modal, Table, TableProps, Tooltip, Input, message, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CreateUserModal from './create.user.modal';
import UpdateUserModal from './update.user.modal';
// import { ColumnType } from 'antd/es/table';
// import '../../styles/users.css'

interface IUsers {
    _id: number;
    email: string;
    name: string;
    role: string;
}

const UsersTable = () => {
    const [listUsers, setListUsers] = useState([])

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjVmOTE3MGZjOTNiYmZiYmM4ZDllYzIzIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3MTA4MzkxMjUsImV4cCI6MTc5NzIzOTEyNX0.CL1-ocUtMEfrWwDhCgnJFrjJL_CRo0slEHlF22w0irQ'

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        // const res = await fetch('http://localhost:8000/api/v1/auth/login', {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         username: 'admin@gmail.com',
        //         password: '123456'
        //     }),
        // })
        // const data = await res.json()

        const res1 = await fetch('http://localhost:8000/api/v1/users/all', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${access_token}`,
            },

        })
        const d = await res1.json()
        // console.log('>>>d:', d.data.result)
        setListUsers(d.data.result)
    }

    const columns: TableProps<IUsers>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (value, record) => <a>{record.name}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
        },
        {
            title: 'Action',
            render: (value, record) => {
                return (
                    <button onClick={() => setIsUpdateModalOpen(true)}>EDIT</button>
                )
            }
        },
    ]

    return (
        <div >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Table User</h2>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsCreateModalOpen(true)}>Add New</Button>
            </div>
            <Table columns={columns} dataSource={listUsers} rowKey='_id' />
            <Button type="primary" >
                Open Modal
            </Button>
            <CreateUserModal
                access_token={access_token}
                getData={getData}
                isCreateModalOpen={isCreateModalOpen}
                setIsCreateModalOpen={setIsCreateModalOpen}
            />
            <UpdateUserModal
                access_token={access_token}
                getData={getData}
                isCreateModalOpen={isUpdateModalOpen}
                setIsCreateModalOpen={setIsUpdateModalOpen}
            />
        </div>
    )
}

export default UsersTable