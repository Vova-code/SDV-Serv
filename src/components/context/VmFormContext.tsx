import {createContext, useState} from "react";
import {VmCardAzureInfos, VmFormContextProps} from "@/utils/types";
import axios from "axios";
import {useRouter} from "next/navigation";

let VmFormContext = createContext<VmFormContextProps | null>(null);

const loadVmInfos = async () => {
    const response = await axios.get("/azure/listAvailableVM");

    return response.data as VmCardAzureInfos[]
}
export const VmFormContextProvider = (props: any) => {
    const routerInstance = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [vmsInfo, setVmsInfo] = useState<VmCardAzureInfos[] | null>(null);

    const toggleLoading = () => {
        setIsLoading(prevState => !prevState)
    }

    const reloadVmsInfos = async () => {
        setIsLoading(true)
        const vmInfos = await loadVmInfos();
        setVmsInfo(vmInfos)
        setIsLoading(false)
        routerInstance.push("/")
    }

    return (
        <VmFormContext.Provider
            {...props}
            value={{
                isLoading,
                toggleLoading,
                vmsInfo,
                reloadVmsInfos
            }}
        />
    )
}

export default VmFormContext
