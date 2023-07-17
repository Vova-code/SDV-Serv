import React, {useContext, useEffect, useState} from 'react';
import {Space} from "antd";
import VmInfoCard from "@/components/molecules/VmInfoCard";
import VmFormContext from "@/components/context/VmFormContext";
import {VmCardAzureInfos, VmFormContextProps} from "@/utils/types";
import {Button} from "@/components/ui/button";
import axios from "axios";
import * as vm from "vm";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Loader2, MonitorOff, RotateCcw} from "lucide-react";

const HomeComponent = () => {
    const { vmsInfo, reloadVmsInfos } = useContext(VmFormContext) as VmFormContextProps

    useEffect(() => {
        reloadVmsInfos()
    }, [])

    useEffect(() => {
    }, [vmsInfo])

    return (
        <>
            <Space className="flex flex-wrap w-full h-full justify-evenly bg-transparent mt-20" size="large">
                {vmsInfo?.map((vm) => {
                    return (
                        <VmInfoCard key={vm.name} name={vm.name} os={vm.os} osVersion={vm.osVersion} publicIp={vm.publicIp}/>
                    )
                })}
                {vmsInfo &&
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
            <Button className="mt-10" onClick={reloadVmsInfos}>
                <RotateCcw className="mr-2" size={16} />
                Rafraîchir
            </Button>
        </>
    );
};

export default HomeComponent;
