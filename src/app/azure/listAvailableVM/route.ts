import {retrieveVmImages} from "@/utils/azure/create-vm";

export async function GET() {
    return retrieveVmImages()
}
