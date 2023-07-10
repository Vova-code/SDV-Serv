import React from 'react';
import {Card, Space} from "antd";
import Button from "../atoms/Button";
import axios from "axios";
import {Separator} from "@/components/ui/separator";
import {CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";

const HomeComponent = () => {
    return (
        <>
            <Space className="bg-transparent" size="middle">
                <Card
                    className="drop-shadow-md"
                    title="Nombre de machines en route"
                    style={{width: 300}}
                >
                    <p className="text-green-400 text-5xl font-bold">2</p>
                </Card>
                <Card
                    className="drop-shadow-md"
                    title="Nombre de machines crées"
                    style={{width: 300}}
                >
                    <p className="text-red-400 text-5xl font-bold">0</p>
                </Card>
            </Space>
            <Separator/>
            <Space className="bg-transparent" size="middle">
                <Card>
                    <CardHeader>
                        <CardTitle>Machine Ubuntu</CardTitle>
                        <Separator />
                        <CardContent className="flex flex-col items-start mb-2">
                            <Label className="mb-2 mt-2">IP publique: 51.51.51.51</Label>
                            <Label>OS: UbuntuServer</Label>
                        </CardContent>
                    </CardHeader>
                </Card>
            </Space>
        </>
    );
};

export default HomeComponent;
