'use client'

import React, {useState} from 'react'
import {Menu, MenuProps} from 'antd'
import {HomeOutlined, LaptopOutlined} from "@ant-design/icons";

const items: MenuProps['items'] = [
    {
        label: 'Accueil',
        key: 'home',
        icon: <HomeOutlined />,
    },
    {
        label: 'Mes machines',
        key: 'SubMenu',
        icon: <LaptopOutlined />,
    },
]

const Navbar: React.FC = () => {
    const [current, setCurrent] = useState('home');

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    }

    return (
        <Menu
            className="drop-shadow-xl mb-8 rounded-xl"
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
        />
    )
}

export default Navbar