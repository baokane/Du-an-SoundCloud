import { useEffect, useState } from 'react'
import { Button, Modal, Table, TableProps, Tooltip, Input, message, notification, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CreateUserModal from './create.user.modal';
import UpdateUserModal from './update.user.modal';
// import { ColumnType } from 'antd/es/table';
// import '../../styles/users.css'

export interface IUsers {
    _id: number;
    email: string;
    name: string;
    role: string;
    password: string;
    age: string;
    gender: string;
    address: string;
}

const UsersTable = () => {
    const [listUsers, setListUsers] = useState([])

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState<IUsers | null>(null)

    const access_token = localStorage.getItem('access_token') as string

    const [meta, setMeta] = useState(
        {
            current: 1,
            pageSize: 2,
            pages: 0,
            total: 0
        }
    )

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {

        const res1 = await fetch(`http://localhost:8000/api/v1/users?current=${meta.current}&pageSize=${meta.pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${access_token}`,
            },

        })
        const d = await res1.json()
        if (!d.data) {
            notification.error({
                message: JSON.stringify(d.message)
            })
        }
        setListUsers(d.data.result)
        setMeta({
            current: d.data.meta.current,
            pageSize: d.data.meta.pageSize,
            pages: d.data.meta.pages,
            total: d.data.meta.total
        })
    }

    // Popconfirm
    const confirm = async (user: IUsers) => {
        const res = await fetch(`http://localhost:8000/api/v1/users/${user._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${access_token}`,
            },

        })
        const d = await res.json()
        console.log('data:', d)
        if (d && d.data) {
            message.success('Xóa user thành công!')
            await getData()
        } else {
            notification.error({
                message: 'Có lỗi xảy ra',
                description: JSON.stringify(d.message)
            })
        }
    };

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
                    <div>
                        <button onClick={() => {
                            setIsUpdateModalOpen(true)
                            setDataUpdate(record)
                        }}
                        >EDIT</button>
                        <Popconfirm
                            title="Delete the user"
                            description={`Are you sure to delete this user?, name = ${record.name}`}
                            onConfirm={() => confirm(record)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button style={{ marginLeft: 20 }} danger>Delete</Button>
                        </Popconfirm>
                    </div>
                )
            }
        },
    ]

    const handleOnchange = async (page: number, pageSize: number) => {

        const res1 = await fetch(`http://localhost:8000/api/v1/users?current=${page}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${access_token}`,
            },

        })
        const d = await res1.json()
        if (!d.data) {
            notification.error({
                message: JSON.stringify(d.message)
            })
        }
        setListUsers(d.data.result)
        setMeta({
            current: d.data.meta.current,
            pageSize: d.data.meta.pageSize,
            pages: d.data.meta.pages,
            total: d.data.meta.total
        })
    }

    return (
        <div >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Table User</h2>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsCreateModalOpen(true)}>Add New</Button>
            </div>
            <Table
                columns={columns}
                dataSource={listUsers}
                rowKey='_id'
                pagination={
                    {
                        current: meta.current,
                        pageSize: meta.pageSize,
                        total: meta.total,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                        onChange: (page: number, pageSize: number) => handleOnchange(page, pageSize),
                        showSizeChanger: true
                    }
                }
            />

            <CreateUserModal
                access_token={access_token}
                getData={getData}
                isCreateModalOpen={isCreateModalOpen}
                setIsCreateModalOpen={setIsCreateModalOpen}
            />
            <UpdateUserModal
                access_token={access_token}
                getData={getData}
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />
        </div>
    )
}

export default UsersTable