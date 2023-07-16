
import {NextRequest} from "next/server";
import {retrieveOs} from "@/utils/azure/virtualMachinesConfigs";
import {createResources} from "@/utils/azure/create-vm";

export async function POST(request: NextRequest) {
    const { selectedOs } = await request.json();

    const vmConfig = retrieveOs(selectedOs);

    const createdResource = await createResources(vmConfig)
    return new Response(JSON.stringify(createdResource),
        {
            status: 200,
        })
}
