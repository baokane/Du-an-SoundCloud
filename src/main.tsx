import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// import './index.scss'
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import UsersPage from './screens/users.page.tsx';

import { UserOutlined, HomeOutlined, SettingOutlined, FolderOpenOutlined, MenuFoldOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import TracksTable from './components/tracks/tracks.table.tsx';
import TracksPage from './screens/track.page.tsx';
import CommentPage from './screens/comments.tsx';

const items: MenuProps['items'] = [
  {
    label: <Link to={'/'}>Home</Link>,
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: <Link to={'/users'}>Manage Users</Link>,
    key: 'users',
    icon: <UserOutlined />,
  },
  {
    label: <Link to={'/tracks'}>Manage Tracks</Link>,
    key: 'tracks',
    icon: <FolderOpenOutlined />,
  },
  {
    label: <Link to={'/comments'}>Manage Comments</Link>,
    key: 'comments',
    icon: <MenuFoldOutlined />,
  },
];

const Header: React.FC = () => {
  const [current, setCurrent] = useState('home');

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
  )
};

const LayoutAdmin = () => {

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {

    const res = await fetch('http://localhost:8000/api/v1/auth/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: 'hoidanit@gmail.com',
        password: '123456'
      }),
    })
    const d = await res.json()
    if (d && d.data) {
      localStorage.setItem('access_token', d.data.access_token)
    }
  }
  return (
    <div>
      <Header />
      <Outlet />
      <footer>Footer</footer>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutAdmin />,
    children: [
      { index: true, element: <UsersPage /> },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "tracks",
        element: <TracksPage />,
      },
      {
        path: "comments",
        element: <CommentPage />,
      },
    ],
  },

]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
