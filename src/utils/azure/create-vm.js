import {setTimeout} from 'timers'

const util = require('util')
const {
  ClientSecretCredential,
  DefaultAzureCredential
} = require('@azure/identity')
const { ComputeManagementClient, listByEdgeZone } = require('@azure/arm-compute')
const { ResourceManagementClient } = require('@azure/arm-resources')
const { StorageManagementClient } = require('@azure/arm-storage')
const { NetworkManagementClient } = require('@azure/arm-network')

// Store function output to be used elsewhere
let randomIds = {}
let subnetInfo = null
let publicIPInfo = null
let vmImageInfo = null
let nicInfo = null

// CHANGE THIS - used as prefix for naming resources
const yourAlias = 'vovasdv'

// CHANGE THIS - used to add tags to resources
const projectName = 'sdv-serv-web-app'

// Resource configs
const location = 'francecentral'
const accType = 'Standard_LRS'

// Ubuntu config for VM
// const publisher = 'Canonical'
// const offer = 'UbuntuServer'
// const sku = '18.04-LTS'
const adminUsername = 'notadmin'
const adminPassword = 'Pa$$w0rd92'

// Azure authentication in environment variables for DefaultAzureCredential
const tenantId =
  process.env['AZURE_TENANT_ID']
const clientId =
  process.env['AZURE_CLIENT_ID']
const secret =
  process.env['AZURE_CLIENT_SECRET']
const subscriptionId =
  process.env['AZURE_SUBSCRIPTION_ID']

let credentials = null

if (process.env.production) {
  // production
  credentials = new DefaultAzureCredential()
} else {
  // development
  credentials = new ClientSecretCredential(tenantId, clientId, secret)
}
// Azure services
const resourceClient = new ResourceManagementClient(
  credentials,
  subscriptionId
)
const computeClient = new ComputeManagementClient(credentials, subscriptionId)
const storageClient = new StorageManagementClient(credentials, subscriptionId)
const networkClient = new NetworkManagementClient(credentials, subscriptionId)

const _generateRandomId = (prefix, existIds) => {
  var newNumber
  while (true) {
    newNumber = prefix + Math.floor(Math.random() * 10000)
    if (!existIds || !(newNumber in existIds)) {
      break
    }
  }
  return newNumber
}

//Random number generator for service names and settings
const generateRandomIds = () => {
  let resourceGroupName = _generateRandomId(`${yourAlias}-testrg`, randomIds)
  let vmName = _generateRandomId(`${yourAlias}vm`, randomIds)
  let storageAccountName = _generateRandomId(`${yourAlias}ac`, randomIds)
  let vnetName = _generateRandomId(`${yourAlias}vnet`, randomIds)
  let subnetName = _generateRandomId(`${yourAlias}subnet`, randomIds)
  let publicIPName = _generateRandomId(`${yourAlias}pip`, randomIds)
  let networkInterfaceName = _generateRandomId(`${yourAlias}nic`, randomIds)
  let ipConfigName = _generateRandomId(`${yourAlias}crpip`, randomIds)
  let domainNameLabel = _generateRandomId(`${yourAlias}domainname`, randomIds)
  let osDiskName = _generateRandomId(`${yourAlias}osdisk`, randomIds)
  return {
    resourceGroupName,
    vmName,
    storageAccountName,
    vnetName,
    subnetName,
    publicIPName,
    networkInterfaceName,
    ipConfigName,
    domainNameLabel,
    osDiskName
  }
}

// Create resources then manage them (on/off)
export async function createResources(vmConfig) {
  let {
    resourceGroupName,
    vmName,
    storageAccountName,
    vnetName,
    subnetName,
    publicIPName,
    networkInterfaceName,
    ipConfigName,
    domainNameLabel,
    osDiskName
  } = generateRandomIds()

  try {
    const result = await createResourceGroup()
    console.log('⚙️Ressource Infos: ', result)

    const accountInfo = await createStorageAccount()
    const vnetInfo = await createVnet()
    subnetInfo = await getSubnetInfo()
    publicIPInfo = await createPublicIP()
    nicInfo = await createNIC(subnetInfo, publicIPInfo)
    vmImageInfo = await findVMImage(vmConfig.publisher, vmConfig.offer, vmConfig.sku)
    const nicResult = await getNICInfo()
    return await createVirtualMachine(
        vmConfig.publisher,
        vmConfig.offer,
        vmConfig.sku,
        nicInfo.id,
        vmImageInfo[0].name
    )
        .finally(() => {
          setTimeout(() => {
            console.log('\n⚡ Deleting resource group: '
                + resourceGroupName
                + ' '
                + new Date().toLocaleTimeString('fr-FR'))
            deleteResourceGroup()
          }, 5 * 60 * 1000)
        })
  } catch (err) {
    console.log(err)
  }

  async function deleteResourceGroup() {
    // Create Azure SDK client for Resource Management such as resource groups
    const resourceClient = new ResourceManagementClient(
      credentials,
      subscriptionId
    );

    const result = await resourceClient.resourceGroups.beginDeleteAndWait(
      resourceGroupName
    );
  }

  async function createResourceGroup() {
    console.log('\n1.Creating resource group: ' + resourceGroupName)
    const groupParameters = {
      location: location,
      tags: { project: projectName }
    }
    return await resourceClient.resourceGroups.createOrUpdate(
      resourceGroupName,
      groupParameters
    )
  }

  async function createStorageAccount() {
    console.log('\n2.Creating storage account: ' + storageAccountName)
    const createParameters = {
      location: location,
      sku: {
        name: accType
      },
      kind: 'Storage',
      tags: {
        project: projectName
      }
    }
    return await storageClient.storageAccounts.beginCreateAndWait(
      resourceGroupName,
      storageAccountName,
      createParameters
    )
  }

  async function createVnet() {
    console.log('\n3.Creating vnet: ' + vnetName)
    const vnetParameters = {
      location: location,
      addressSpace: {
        addressPrefixes: ['10.0.0.0/16']
      },
      dhcpOptions: {
        dnsServers: ['10.1.1.1', '10.1.2.4']
      },
      subnets: [{ name: subnetName, addressPrefix: '10.0.0.0/24' }]
    }
    return await networkClient.virtualNetworks.beginCreateOrUpdateAndWait(
      resourceGroupName,
      vnetName,
      vnetParameters
    )
  }

  async function getSubnetInfo() {
    console.log('\nGetting subnet info for: ' + subnetName)
    return await networkClient.subnets.get(
      resourceGroupName,
      vnetName,
      subnetName
    )
  }

  async function createPublicIP() {
    console.log('\n4.Creating public IP: ' + publicIPName)
    const publicIPParameters = {
      location: location,
      publicIPAllocationMethod: 'Dynamic',
      dnsSettings: {
        domainNameLabel: domainNameLabel
      }
    }
    return await networkClient.publicIPAddresses.beginCreateOrUpdateAndWait(
      resourceGroupName,
      publicIPName,
      publicIPParameters
    )
  }

  async function createNIC(subnetInfo, publicIPInfo) {
    console.log('\n5.Creating Network Interface: ' + networkInterfaceName)
    const nicParameters = {
      location: location,
      ipConfigurations: [
        {
          name: ipConfigName,
          privateIPAllocationMethod: 'Dynamic',
          subnet: subnetInfo,
          publicIPAddress: publicIPInfo
        }
      ]
    }
    return await networkClient.networkInterfaces.beginCreateOrUpdateAndWait(
      resourceGroupName,
      networkInterfaceName,
      nicParameters
    )
  }

  async function findVMImage(publisher, offer, sku) {
    console.log(
      util.format(
        '\nFinding a VM Image for location %s from ' +
        'publisher %s with offer %s and sku %s',
        location,
        publisher,
        offer,
        sku
      )
    )
    return await computeClient.virtualMachineImages.list(
      location,
      publisher,
      offer,
      sku
    )
  }

  async function getNICInfo() {
    return await networkClient.networkInterfaces.get(
      resourceGroupName,
      networkInterfaceName
    )
  }

  async function createVirtualMachine(publisher, offer, sku) {
    const vmParameters = {
      location: location,
      osProfile: {
        computerName: vmName,
        adminUsername: adminUsername,
        adminPassword: adminPassword
      },
      hardwareProfile: {
        vmSize: 'Standard_B1ls'
      },
      storageProfile: {
        imageReference: {
          publisher: publisher,
          offer: offer,
          sku: sku,
          version: "latest"
        },
        osDisk: {
          name: osDiskName,
          caching: 'None',
          createOption: 'fromImage',
          vhd: {
            uri:
              'https://' +
              storageAccountName +
              '.blob.core.windows.net/nodejscontainer/osnodejslinux.vhd'
          }
        }
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: nicInfo.id,
            primary: true
          }
        ]
      }
    }
    console.log('6.Creating Virtual Machine: ' + vmName)
    console.log(
      ' VM create parameters: ' + util.inspect(vmParameters, { depth: null })
    )
    const resCreate = await computeClient.virtualMachines.beginCreateOrUpdateAndWait(
      resourceGroupName,
      vmName,
      vmParameters
    )
    return await computeClient.virtualMachines.get(
      resourceGroupName,
      vmName
    )
  }
}
export const retrieveVmOsInfos = async () => {
  const result = []
  const vmInfos = []

  for await (const item of resourceClient.resourceGroups.list()) {
    if (item.name !== "NetworkWatcherRG") {
      result.push(item.name)
    }
  }

  for (const value of result) {
    let vmInfo = {}

    for await (const item of computeClient.virtualMachines.list(value)) {
      vmInfo = {
        ...vmInfo,
        name: item.name,
        os: item.storageProfile.imageReference.publisher,
        osVersion: item.storageProfile.imageReference.offer
      }
    }

    for await (const item of networkClient.publicIPAddresses.list(value)) {
      vmInfo = {
        ...vmInfo,
        publicIp: item.ipAddress
      }
    }

    vmInfos.push(vmInfo)
  }
  return vmInfos
}
