import React from 'react';
import Button from "../atoms/Button";
import {Space} from "antd";
import axios from "axios";

const VirtualMachinesComponent = () => {
    const getVms = () => {
        axios.get('/azure/listAvailableVM').then(value => console.log(value))
    }
    const createVM = async () => {
        await axios.get('/azure/createVm')
            .then(res => {
                console.log("Resource: ", {res})
            })
            .catch((e) => {
                console.error(e)
            })
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
