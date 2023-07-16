import {AzureOsConfig} from "@/utils/types";

export const retrieveOs = (osType: string) => {
    switch (osType) {
        case "Debian11":
            return {
                publisher: "Debian",
                offer: "Debian-11",
                sku: "11-backports-gen2",
            } as AzureOsConfig
        case "Debian10":
            return {
                publisher: "Debian",
                offer: "Debian-10",
                sku: "10",
            } as AzureOsConfig
        case "UbuntuLTS":
            return {
                publisher: "Canonical",
                offer: "UbuntuServer",
                sku: "18.04-LTS",
            } as AzureOsConfig
        case "Ubuntu2204":
            return {
                publisher: "Canonical",
                offer: "Debian-11",
                sku: "22_04-lts-gen2",
            } as AzureOsConfig
        default:
            return null
    }
}
