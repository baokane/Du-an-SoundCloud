import React, { useEffect, useState } from 'react';
import { Button, Pagination, Popconfirm, Table, message, notification } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';

interface DataType {
    title: string;
    description: string;
    category: string;
    trackUrl: string;
    uploader: {
        "_id": number,
        "email": string,
        "name": string,
        "role": string,
        "type": string
    }
}

interface ITracks {
    _id: string;
    category: string;
    countLike: number;
    countPlay: number;
    createdAt: string;
    description: string;
    imgUrl: string;
    isDeleted: boolean;
    title: string;
    trackUrl: string;
    uploader: any;
    __v: any
}

const TracksTable = () => {

    const [listTracks, setListTracks] = useState([])
    const [meta, setMeta] = useState({
        "current": 1,
        "pageSize": 10,
        "pages": 3,
        "total": 30
    })
    const access_token = localStorage.getItem('access_token',)



    const columns: TableColumnsType<DataType> = [
        {
            title: "Index",
            key: "index",
            render: (value, item, index) => (meta.current - 1) * meta.pageSize + index + 1
        },
        {
            title: 'Title',
            dataIndex: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Category',
            dataIndex: 'category',
        },
        {
            title: 'trackUrl',
            dataIndex: 'trackUrl',
        },
        {
            title: 'Uploader',
            // Cách 1
            // dataIndex: ['uploader', 'name'],

            // Cách 2:
            render: (value, record, index) => {
                return (
                    <>{record.uploader.name}</>
                )
            }
        },
        {
            title: 'English Score',
            render: (value, record: any, index) => {
                // console.log('re:', record)
                const confirm = async (tracks: ITracks) => {
                    const res = await fetch(`http://localhost:8000/api/v1/tracks/${tracks._id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            'Authorization': `Bearer ${access_token}`,
                        },
                    })
                    const d = await res.json()
                    console.log('>>>d :', d)
                    if (!d.data) {
                        notification.error({
                            description: 'Có lỗi xảy ra!',
                            message: d.message
                        })
                    } else {
                        message.success('Xóa bài track thành công');
                        await getData()
                    }
                };
                return (
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => confirm(record)}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger>Delete</Button>
                    </Popconfirm>
                )
            }
        },
    ];

    const onChange: TableProps<DataType>['onChange'] = async (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
        const res = await fetch(`http://localhost:8000/api/v1/tracks?current=${pagination.current}&pageSize=${pagination.pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${access_token}`,
            },
        })
        const d = await res.json()
        if (!d.data) {
            notification.error({
                description: 'Có lỗi xảy ra!',
                message: d.message
            })
        }
        console.log("d::", d)
        setListTracks(d?.data.result)
        setMeta({
            "current": d?.data?.meta?.current,
            "pageSize": d?.data?.meta?.pageSize,
            "pages": d?.data?.meta?.pages,
            "total": d?.data?.meta?.total
        })
    };

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const res = await fetch(`http://localhost:8000/api/v1/tracks?current=${meta.current}&pageSize=${meta.pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${access_token}`,
            },
        })
        const d = await res.json()
        if (!d.data) {
            notification.error({
                description: 'Có lỗi xảy ra!',
                message: d.message
            })
        }
        console.log("d::", d)
        setListTracks(d?.data.result)
        setMeta({
            "current": d?.data?.meta?.current,
            "pageSize": d?.data?.meta?.pageSize,
            "pages": d?.data?.meta?.pages,
            "total": d?.data?.meta?.total
        })
    }

    return (
        <>
            <Table
                columns={columns}
                dataSource={listTracks}
                onChange={onChange}
                pagination={{
                    total: meta.total,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    defaultPageSize: meta.pageSize,
                    defaultCurrent: meta.current,
                    showSizeChanger: true
                }}
            />

        </>
    )
}

export default TracksTable;