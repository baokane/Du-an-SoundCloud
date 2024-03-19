import { useEffect, useState } from 'react'
import '../../styles/users.css'

interface IUsers {
    _id: number;
    email: string;
    name: string;
    role: string;
}

const UsersTable = () => {
    const [listUsers, setListUsers] = useState([])
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
        const access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjVmOTE3MGZjOTNiYmZiYmM4ZDllYzIzIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3MTA4MzkxMjUsImV4cCI6MTc5NzIzOTEyNX0.CL1-ocUtMEfrWwDhCgnJFrjJL_CRo0slEHlF22w0irQ'

        const res1 = await fetch('http://localhost:8000/api/v1/users/all', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${access_token}`,
            },

        })
        const d = await res1.json()
        console.log('>>>d:', d.data.result)
        setListUsers(d.data.result)
    }
    return (
        <div>
            <h2>HTML Table</h2>

            <table>
                <thead>
                    <tr>
                        <td>Email</td>
                        <td>Name</td>
                        <td>Role</td>
                    </tr>
                </thead>
                <tbody>
                    {listUsers.map((item: IUsers, index) => {
                        return (
                            <tr key={item._id}>
                                <td>{item.email}</td>
                                <td>{item.name}</td>
                                <td>{item.role}</td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default UsersTable