'use client'

import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {Spin} from "antd";

const AlternativeAuth = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const supabase = createClientComponentClient()

    const bgButton = () => {
        return isLoading ? 'bg-indigo-600/50' : 'bg-indigo-600 hover:bg-indigo-500'
    }

    const handleSignIn = async () => {
        setIsLoading(true)
        try {
            await supabase.auth.signInWithPassword({
                email,
                password,
            })
            router.refresh()
        } catch (e) {
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container px-6 mx-auto">
            <div
                className="flex flex-col text-center md:text-left md:flex-row h-screen justify-evenly md:items-center"
            >
                <div className="flex flex-col w-full h-xl p-8 mr-16 rounded-xl backdrop-blur bg-white/20">
                    <div>
                        <svg
                            className="w-20 h-20 mx-auto md:float-left fill-stroke text-gray-50"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                            />
                        </svg>
                    </div>
                    <h1 className="text-5xl text-gray-50 font-bold">SDV Serv</h1>
                    <p className="w-5/12 mx-auto md:mx-0 text-gray-50">
                        Controllez et déployez vos machine Azure cloud
                    </p>
                </div>
                <div className="w-full md:w-full lg:w-9/12 mx-auto md:mx-0">
                    <div className="bg-white p-10 flex flex-col items-center w-full shadow-xl rounded-xl">
                        <h1 className="font-bold text-xl text-indigo-600">Connectez-vous</h1>
                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <div>
                                <label htmlFor="email"
                                       className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        onChange={(e) => setEmail(e.target.value)} value={email}
                                        className="focus-visible:outline-none block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        Mot de passe
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        className="focus-visible:outline-none block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    onClick={handleSignIn}
                                    className={`flex w-full justify-center ${bgButton()} rounded-md mt-9 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>
                                    {isLoading ? <Spin size="default" wrapperClassName="bg-white"/> : 'Se connecter'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AlternativeAuth
