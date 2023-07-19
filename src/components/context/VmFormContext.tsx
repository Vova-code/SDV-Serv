import {createContext, useState} from "react";
import {VmCardAzureInfos, VmFormContextProps} from "@/utils/types";
import axios from "axios";
import {useRouter} from "next/navigation";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";

let VmFormContext = createContext<VmFormContextProps | null>(null);

const loadVmInfos = async () => {
    const response = await axios.get("/azure/listAvailableVM");

    return response.data as VmCardAzureInfos[]
}
export const VmFormContextProvider = (props: any) => {
    const routerInstance = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [vmsInfo, setVmsInfo] = useState<VmCardAzureInfos[] | null>(null);
    const supabaseClient = createClientComponentClient();

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

    const checkCredits = async () => {
        const infos = await loadVmInfos();
        const { data: { user } } = await supabaseClient.auth.getUser();
        const credits = user?.user_metadata?.credits;

        return credits > 0 && infos.length < credits;
    }

    return (
        <VmFormContext.Provider
            {...props}
            value={{
                isLoading,
                toggleLoading,
                vmsInfo,
                reloadVmsInfos,
                checkCredits
            }}
        />
    )
}

export default VmFormContext
