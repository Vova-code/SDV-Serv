export interface MenuContextProps {
    current: string,
    navigate: (key: string) => void
}

export interface VmFormContextProps {
    isLoading: boolean,
    toggleLoading: () => void,
    vmsInfo: VmCardAzureInfos[],
    reloadVmsInfos: () => void,
    checkCredits: () => boolean
}

export interface AzureOsConfig {
    publisher: string,
    offer: string,
    sku: string
}

export interface VmCardAzureInfos {
    name: string,
    os: string,
    osVersion: string,
    publicIp: string
}
