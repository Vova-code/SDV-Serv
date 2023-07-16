import {createContext, useState} from "react";
import {VmFormContextProps} from "@/utils/types";

let VmFormContext = createContext<VmFormContextProps | null>(null);

export const VmFormContextProvider = (props: any) => {
    const [isLoading, setIsLoading] = useState(false);

    const toggleLoading = () => {
        setIsLoading(prevState => !prevState)
    }

    return (
        <VmFormContext.Provider
            {...props}
            value={{ isLoading, toggleLoading }}
        />
    )
}

export default VmFormContext
