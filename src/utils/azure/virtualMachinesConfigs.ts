import {AzureOsConfig} from "@/utils/types";

export const retrieveOs = (osType: string) => {
    switch (osType) {
        case "Debian11":
            return {
                publisher: "Canonical",
                offer: "0001-com-ubuntu-server-jammy",
                sku: "22_04-lts-gen2",
            } as AzureOsConfig
        case "Debian10":
            return {
                publisher: "Debian",
                offer: "debian-10",
                sku: "10",
            } as AzureOsConfig
        case "UbuntuLTS":
            return {
                publisher: "Canonical",
                offer: "UbuntuServer",
                sku: "18.04-LTS",
            } as AzureOsConfig
        case "RHEL":
            return {
                publisher: "RedHat",
                offer: "RHEL",
                sku: "7-LVM",
            } as AzureOsConfig
        default:
            return null
    }
}
