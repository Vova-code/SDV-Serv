'use client'

import {Button, Card, Space} from "antd"
import axios from "axios";

const createVM = () => {
    axios.get('/azure').then((res) => console.log({res}))
}

const Account = () => {
    return (
        <div className='bg-transparent w-full'>
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
            <Button title="Créer une Macine" type="primary" shape="round" onClick={createVM}/>
        </div>
    )
}

export default Account
