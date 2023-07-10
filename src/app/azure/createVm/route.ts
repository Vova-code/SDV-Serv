import { createResources } from '@/utils/azure/create-vm'
import {NextResponse} from "next/server";
import {Request} from "next/dist/compiled/@edge-runtime/primitives";

export async function GET(request: Request) {
    await createResources()
        .then(res => {
            console.log("Azure Response: ", res)
            return res
        })
        .catch(reason => {
            return reason
        });
}
