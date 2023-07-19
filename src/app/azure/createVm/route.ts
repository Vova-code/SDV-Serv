
import {NextRequest} from "next/server";
import {retrieveOs} from "@/utils/azure/virtualMachinesConfigs";
import {createResources} from "@/utils/azure/create-vm";
import {createRouteHandlerClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

export async function POST(request: NextRequest) {
    const { selectedOs } = await request.json();
    const vmConfig = retrieveOs(selectedOs);

    const createdResource = await createResources(vmConfig)
    return new Response(JSON.stringify(createdResource),
        {
            status: 200,
        })
}
