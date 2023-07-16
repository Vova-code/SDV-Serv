export interface MenuContextProps {
    current: string,
    navigate: () => void
}

export interface VmFormContextProps {
    isLoading: boolean,
    toggleLoading: () => void
}

export interface AzureOsConfig {
    publisher: string,
    offer: string,
    sku: string
}
