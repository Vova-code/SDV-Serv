'use client'

import {useContext} from "react";
import MenuContext from "../../components/context/MenuContext";
import HomeComponent from "../../components/molecules/HomeComponent";
import VirtualMachinesComponent from "../../components/molecules/VirtualMachinesComponent";

const Account = () => {
    // @ts-ignore
    const { current } = useContext(MenuContext)
    const displayScreen = () => {
        if (current === 'home') {
            return <HomeComponent/>
        }
        return <VirtualMachinesComponent/>
    }

    return (
        <div className='flex flex-col h-[90%] justify-around items-center bg-transparent w-full'>
            {displayScreen()}
        </div>
    )
}

export default Account
