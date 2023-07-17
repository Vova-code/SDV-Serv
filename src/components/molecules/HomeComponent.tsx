import React, {useContext, useEffect} from 'react';
import {Space} from "antd";
import VmInfoCard from "@/components/molecules/VmInfoCard";
import VmFormContext from "@/components/context/VmFormContext";
import {VmFormContextProps} from "@/utils/types";
import {Button} from "@/components/ui/button";
import axios from "axios";

const loadVmInfos = async () => {
    await axios.get("/azure/listAvailableVM")
}

const HomeComponent = () => {
    const { isLoading } = useContext(VmFormContext) as VmFormContextProps

    useEffect(() => {
        return
    }, [])

    return (
        <>
            <Space className="flex flex-wrap w-full h-full justify-evenly bg-transparent mt-20" size="large">
                <VmInfoCard />
                <VmInfoCard />
                <VmInfoCard />
            </Space>
            <Button className="mt-10" onClick={loadVmInfos}>Charger les VMs</Button>
        </>
    );
};

export default HomeComponent;
