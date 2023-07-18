import React, {useContext} from 'react';
import {NavigationMenu, NavigationMenuItem, NavigationMenuList} from "@/components/ui/navigation-menu";
import {HomeIcon, LaptopIcon, Power} from "lucide-react";
import MenuContext from "@/components/context/MenuContext";
import {MenuContextProps} from "@/utils/types";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useRouter} from "next/navigation";

const Navbar = () => {
    const {navigate, current} = useContext(MenuContext) as MenuContextProps
    const router = useRouter();
    const supabaseClient = createClientComponentClient();

    const logout = async () => {
        await supabaseClient.auth.signOut()
        router.refresh()
    }


    return (
        <NavigationMenu
            className="min-w-full flex relative justify-start py-2 px-4 rounded-2xl bg-white drop-shadow-lg">
            <NavigationMenuList>
                <NavigationMenuItem
                    className={`flex p-[4px] items-center border-black mr-4 ${current === 'home' ? 'border-b-2 font-bold' : ''} cursor-pointer`}
                    onClick={() => navigate("home")}
                >
                    <HomeIcon className="mr-2" size={18}/>
                    Accueil
                </NavigationMenuItem>
                <NavigationMenuItem
                    className={`flex p-[4px] items-center border-black mr-4 ${current === 'createVm' ? 'border-b-2 font-bold' : ''} cursor-pointer`}
                    onClick={() => navigate("createVm")}
                >
                    <LaptopIcon className="mr-2" size={18}/>
                    Créer une machine
                </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuItem
                className="flex items-center p-2 absolute right-4 text-sm cursor-pointer rounded-2xl bg-red-600 text-white font-semibold"
                onClick={logout}
            >
                <Power className="mr-2" size={16} strokeWidth={3}/>
                Déconnexion
            </NavigationMenuItem>
        </NavigationMenu>
    );
};

export default Navbar;
