import {retrieveVmIpAddresses, retrieveVmOsInfos} from "@/utils/azure/create-vm";

export async function GET() {
    const ipAddresses = await retrieveVmIpAddresses();
    const osInfos = await retrieveVmOsInfos();

    // console.log("---------- IP ----------: ", ipAddresses)
    // console.log("---------- OS ----------: ", osInfos)

    return new Response(JSON.stringify({ipAddresses, osInfos}),
        {
            status: 200,
        })
}
