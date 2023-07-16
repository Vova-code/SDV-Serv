import React, {useContext} from 'react';
import {Space} from "antd";
import CreateVMForm from "@/components/molecules/CreateVMForm";
import VmFormContext from "@/components/context/VmFormContext";
import {Loader2} from "lucide-react";
import {VmFormContextProps} from "@/utils/types";

const VirtualMachinesComponent = () => {
    const { isLoading } = useContext(VmFormContext) as VmFormContextProps

    return (
        <>
            <Space className="flex flex-col bg-transparent" size="middle">
                {isLoading ?
                    <Loader2 className="animate-spin" size={40} /> :
                    <CreateVMForm/>
                }
            </Space>
        </>
    );
};

export default VirtualMachinesComponent;
