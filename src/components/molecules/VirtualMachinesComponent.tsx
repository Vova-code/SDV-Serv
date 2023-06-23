import React from 'react';
import Button from "../atoms/Button";
import {Card, Space} from "antd";
import axios from "axios";

const getVms = () => {
    axios.get('/azure/listAvailableVM').then(value => console.log(value))
}

const VirtualMachinesComponent = () => {
    return (
        <>
            <Space className="bg-transparent" size="middle">
                <Button type="primary" handleClick={getVms}>
                    Voir mes machines
                </Button>
            </Space>
        </>
    );
};

export default VirtualMachinesComponent;
