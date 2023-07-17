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
import {Loader2} from "lucide-react";

const HomeComponent = () => {
    const { vmsInfo, reloadVmsInfos } = useContext(VmFormContext) as VmFormContextProps

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
                    <Card className="w-[350px] drop-shadow-2xl">
                        <CardHeader>
                            <CardTitle>Pas de machine virtuelle en route...</CardTitle>
                            <CardDescription>Pensez à en créer une</CardDescription>
                        </CardHeader>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline">Créer une Vm</Button>
                        </CardFooter>
                    </Card>
                }
            </Space>
            <Button className="mt-10" onClick={reloadVmsInfos}>Charger les VMs</Button>
        </>
    );
};

export default HomeComponent;
