import React from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";

const VmInfoCard = () => {
    return (
        <Card className="w-[350px] drop-shadow-2xl">
            <CardHeader>
                <CardTitle>Machine UbuntuServer</CardTitle>
                <CardDescription>Version: 18.04-LTS</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <Label className="font-bold">Nom</Label>
                        <span className="text-neutral-500">vovasdv-7013</span>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label className="font-bold">IP Publique</Label>
                        <span className="text-neutral-500">21.111.38.57</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="destructive">Détruire</Button>
            </CardFooter>
        </Card>
    );
};

export default VmInfoCard;
