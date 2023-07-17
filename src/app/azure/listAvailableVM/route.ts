import {retrieveVmOsInfos} from "@/utils/azure/create-vm";
import {VmCardAzureInfos} from "@/utils/types";

export async function GET() {
    const osInfos = await retrieveVmOsInfos() as VmCardAzureInfos[];

    return new Response(JSON.stringify(osInfos),
        {
            status: 200,
        })
}
