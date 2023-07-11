import {createResources} from '@/utils/azure/create-vm'
import {NextRequest} from "next/server";

export async function GET(request: NextRequest) {
    const createdResource = await createResources();
    return new Response(JSON.stringify(createdResource),
        {
            status: 200,
        })
}
