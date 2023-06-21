import { createResources } from '../../utils/azure/create-vm'

export async function GET() {
    createResources()
}
