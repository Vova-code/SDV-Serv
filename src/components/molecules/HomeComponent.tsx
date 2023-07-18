import React, {useContext, useEffect} from 'react';
import {Space} from "antd";
import VmInfoCard from "@/components/molecules/VmInfoCard";
import VmFormContext from "@/components/context/VmFormContext";
import {VmFormContextProps} from "@/utils/types";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {MonitorOff, RotateCw} from "lucide-react";

const HomeComponent = () => {
    const { vmsInfo, reloadVmsInfos, isLoading } = useContext(VmFormContext) as VmFormContextProps

    const emptyVms = vmsInfo && vmsInfo.length === 0

    useEffect(() => {
        reloadVmsInfos()
    }, [])

    useEffect(() => {
    }, [vmsInfo])

    return (
        <>
            <Space className="flex flex-wrap w-full h-[80%] justify-evenly bg-transparent" size="large">
                {vmsInfo?.map((vm) => {
                    return (
                        <VmInfoCard key={vm.name} name={vm.name} os={vm.os} osVersion={vm.osVersion} publicIp={vm.publicIp}/>
                    )
                })}
                {emptyVms &&
                    <Card className="flex flex-col items-center w-[550px] bg-white/90 border-dashed border-2 border-slate-400">
                        <CardHeader className="flex flex-col items-center">
                            <CardTitle>Pas de machine virtuelle en route...</CardTitle>
                            <CardDescription className="text-slate-400">Pensez à en créer une</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <MonitorOff className="text-slate-400 animate-pulse" size={34} />
                        </CardContent>
                    </Card>
                }
            </Space>
            <Button onClick={reloadVmsInfos} disabled={isLoading}>
                <RotateCw className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} size={16} />
                {isLoading ? 'Chargement' : 'Rafraîchir'}
            </Button>
        </>
    );
};

export default HomeComponent;
