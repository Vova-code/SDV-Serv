import React from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {VmCardAzureInfos} from "@/utils/types";
import {Laptop2, Loader2} from "lucide-react";

const VmInfoCard = (vmInfo: VmCardAzureInfos) => {
    return (
        <Card className="w-[350px] drop-shadow-2xl">
            <CardHeader>
                <CardTitle>Machine {vmInfo.os}</CardTitle>
                <CardDescription>Version: {vmInfo.osVersion}</CardDescription>
            </CardHeader>
            {vmInfo.name ?
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label className="font-bold">Nom</Label>
                            <span className="text-neutral-500">{vmInfo.name}</span>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label className="font-bold">IP Publique</Label>
                            <span className="text-neutral-500">{vmInfo.publicIp}</span>
                        </div>
                    </div>
                </CardContent> :
                <Loader2 className="ml-40 h-4 w-4 animate-spin" size={20}/>
            }
            <CardFooter className="flex justify-between">
                <Button variant="destructive">Détruire</Button>
            </CardFooter>
        </Card>
    );
};

export default VmInfoCard;
