import {retrieveVmImages} from "@/utils/azure/create-vm";
import {VirtualMachine} from "@azure/arm-compute";

export async function GET() {
    const images = await retrieveVmImages();
    return new Response(JSON.stringify(images),
        {
            status: 200,
        })
}
