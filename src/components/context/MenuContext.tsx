import React, {createContext, useState} from "react";
import {MenuProps} from "antd";
import {MenuContextProps} from "../../types";

let MenuContext = createContext<MenuContextProps | null>(null);

export const MenuContextProvider = (props) => {
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
