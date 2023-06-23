'use client'

import React, {useContext} from 'react'
import {Menu, MenuProps} from 'antd'
import {HomeOutlined, LaptopOutlined} from "@ant-design/icons";
import MenuContext from "../context/MenuContext";

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
    const { navigate, current } = useContext(MenuContext)

    return (
        <Menu
            className="drop-shadow-xl rounded-xl"
            onClick={navigate}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
        />
    )
}

export default Navbar