'use client'

import React, {useContext} from 'react'
import {Menu, MenuProps} from 'antd'
import {HomeOutlined, LaptopOutlined} from "@ant-design/icons";
import MenuContext from "../context/MenuContext";
import {MenuContextProps} from "@/utils/types";

const items: MenuProps['items'] = [
    {
        label: 'Accueil',
        key: 'home',
        icon: <HomeOutlined />,
    },
    {
        label: 'Créer une machine',
        key: 'createVm',
        icon: <LaptopOutlined />,
    },
]

const Navbar: React.FC = () => {
    const { navigate, current } = useContext(MenuContext) as MenuContextProps

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