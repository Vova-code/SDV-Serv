import React, {createContext, useState} from "react";
import {MenuProps} from "antd";
import {MenuContextProps} from "@/utils/types";

let MenuContext = createContext<MenuContextProps | null>(null);

export const MenuContextProvider = (props: any) => {
    const [current, setCurrent] = useState('home');

    const navigate: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    }

    return (
        <MenuContext.Provider
            {...props}
            value={{ current, navigate }}
        />
    )
}

export default MenuContext
