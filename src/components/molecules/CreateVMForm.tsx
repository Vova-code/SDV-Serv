import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {CheckCircle, Clock, Laptop2, Loader2, XCircle} from "lucide-react";
import React, {useContext} from "react";
import {useToast} from "@/components/ui/use-toast";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

import VmFormContext from "@/components/context/VmFormContext";
import axios from "axios";
import {VmFormContextProps} from "@/utils/types";
import {Label} from "@/components/ui/label";

const FormSchema = z.object({
    selectedOs: z
        .string({
            required_error: "Veuillez choisir une distribution pour créer votre VM.",
        })
        .nonempty({
            message: "Choisissez une distribution pour créer votre VM."
        }),
})

const CreateVMForm = () => {
    const { toast } = useToast();
    const { isLoading, toggleLoading, reloadVmsInfos, checkCredits } = useContext(VmFormContext) as VmFormContextProps
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            selectedOs: ''
        },
    })

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        toast({
        // @ts-ignore
            title:
                <div className="flex">
                    <h1 className="text-xl">Création</h1>
                    <Clock className="ml-2" color="#ffa200" />
                </div>
            ,
            description: "Veuillez patientez, votre machine virtuelle est en cours de création.",
        })
        toggleLoading()
        form.reset({selectedOs: undefined})
        const availableCredits = await checkCredits();
        if (availableCredits) {
            await axios.post("/azure/createVm", {selectedOs: data.selectedOs})
                .then(() => {
                    toggleLoading()
                    toast({
                        // @ts-ignore
                        title:
                            <div className="flex">
                                <h1 className="text-xl">Succès</h1>
                                <CheckCircle className="ml-2" color="#04ff00"/>
                            </div>
                        ,
                        description: "Votre machine virtuelle à correctement été crée !",
                    })
                    reloadVmsInfos()
                })
        } else {
            toggleLoading()
            toast({
                // @ts-ignore
                title:
                    <div className="flex">
                        <h1 className="text-xl">Création</h1>
                        <XCircle className="ml-2" color="#fff" />
                    </div>
                ,
                description: "Vous n'avez pas suffisament de crédits pour effectuer cette action.",
                variant: "destructive",
                className: "bg-red-600 text-white font-bold"
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="selectedOs"
                    render={({field}) => (
                        <FormItem>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <Label>Choisisez votre OS</Label>
                                <FormControl>
                                    <SelectTrigger className="border-black border-2">
                                        <SelectValue placeholder="Choisisez votre OS"/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-gray-200 border-black">
                                    <SelectItem value="Debian10">Debian 10</SelectItem>
                                    <SelectItem value="UbuntuLTS">Ubuntu LTS</SelectItem>
                                    <SelectItem value="RHEL">RHEL</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> :
                        <Laptop2 className="mr-2 h-4 w-4"/>}
                    Créer une Vm
                </Button>
            </form>
        </Form>
    )
}

export default CreateVMForm
