import React from 'react';
import {Card, Space} from "antd";
import Button from "../atoms/Button";
import axios from "axios";

const createVM = () => {
    axios.get('/azure/createVm').then((res) => console.log({res}))
}

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
            <Space className="bg-transparent" size="middle">
                <Button type="danger" handleClick={createVM}>
                    Créer une machine
                </Button>
            </Space>
        </>
    );
};

export default HomeComponent;
