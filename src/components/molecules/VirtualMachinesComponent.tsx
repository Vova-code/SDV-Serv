import React from 'react';
import Button from "../atoms/Button";
import {Space} from "antd";
import axios from "axios";

const VirtualMachinesComponent = () => {
    const getVms = () => {
        axios.get('/azure/listAvailableVM')
    }
    const createVM = async () => {
        await axios.get('/azure/createVm')

    }

    return (
        <>
            <Space className="bg-transparent" size="middle">
                <Button type="primary" handleClick={getVms}>
                    Voir mes machines
                </Button>
                <Button type="danger" handleClick={createVM}>
                    Créer une machine
                </Button>
            </Space>
        </>
    );
};

export default VirtualMachinesComponent;
