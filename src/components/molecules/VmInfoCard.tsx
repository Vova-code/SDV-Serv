import React from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {VmCardAzureInfos} from "@/utils/types";
import {Laptop2, Loader2} from "lucide-react";
import {Skeleton} from "@/components/ui/skeleton";

const VmInfoCard = (vmInfo: VmCardAzureInfos) => {
    return (
        <Card className="w-[350px] drop-shadow-2xl">
            <CardHeader>
                <CardTitle>Machine {vmInfo.os}</CardTitle>
                <CardDescription>Version: {
                    vmInfo.osVersion ||
                    <Skeleton className="h-4 w-[80px] bg-gray-400"/>
                }
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <Label className="font-bold">Nom</Label>
                        <span className="text-neutral-500">
                            {vmInfo.name || <Skeleton className="h-4 w-[180px] bg-gray-400"/>}
                        </span>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label className="font-bold">IP Publique</Label>
                        <span className="text-neutral-500">
                            {vmInfo.publicIp || <Skeleton className="h-4 w-[120px] bg-gray-400"/>}
                        </span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-center">
                <Button variant="destructive">Détruire</Button>
            </CardFooter>
        </Card>
    );
};

export default VmInfoCard;
