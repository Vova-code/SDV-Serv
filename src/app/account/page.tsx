'use client'

import {useContext} from "react";
import MenuContext from "../../components/context/MenuContext";
import HomeComponent from "../../components/molecules/HomeComponent";
import VirtualMachinesComponent from "../../components/molecules/VirtualMachinesComponent";
import {VmFormContextProvider} from "@/components/context/VmFormContext";
import {MenuContextProps} from "@/utils/types";

const Account = () => {
    const { current } = useContext(MenuContext) as MenuContextProps
    const displayScreen = () => {
        if (current === 'home') {
            return <HomeComponent/>
        }
        return <VirtualMachinesComponent/>
    }

    return (
        <div className='flex flex-col h-[90%] justify-around items-center bg-transparent w-full'>
            <VmFormContextProvider>
                {displayScreen()}
            </VmFormContextProvider>
        </div>
    )
}

export default Account
