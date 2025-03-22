'use client'

import {useActionState, useEffect} from "react";
import {createSubject} from "@/actions/subjectActions";
import {FormState} from "@/types/formState";
import {Loading} from "@/components/Loading";
import {SubjectDTO} from "@/types/dtos/subjectDTO";
import {usePopUpClose} from "@/context/PopUpContext";


export const CreateSubjectView = ({handleAddSubject}: { handleAddSubject: (subject: SubjectDTO) => void }) => {
    const [state, formAction, pending] = useActionState<FormState, FormData>(createSubject, {})
    const handlePopClose = usePopUpClose()
    useEffect(() => {
        if (state.success && state.result != null) {
            handleAddSubject(JSON.parse(state.result) as SubjectDTO);
            handlePopClose()
        }
        state.success = undefined
    }, [state.success, state.result, handleAddSubject, state, handlePopClose]);

    const colors = [
        {hexColor: "#59646d", name: "Grau", hexBgColor: "#eff1f3"},
        {hexColor: "#0b68db", name: "Blau", hexBgColor: "#dcf4ff"},
        {hexColor: "#1c883c", name: "Grün", hexBgColor: "#dafbe2"},
        {hexColor: "#9a6600", name: "Braun", hexBgColor: "#fff8c5"},
        {hexColor: "#bc4d00", name: "Orange", hexBgColor: "#fff0e3"},
        {hexColor: "#ce222d", name: "Rot", hexBgColor: "#ffece9"},
        {hexColor: "#824fdf", name: "Lila", hexBgColor: "#fceeff"},
        {hexColor: "#be3888", name: "Rosa", hexBgColor: "#fdeff6"},
    ]

    const handleCreateSubject = (formData: FormData) => {
        const color = formData.get("colorName");
        const index = colors.findIndex((e) => e.name === color)
        formData.set("hexBgColor", colors[index].hexBgColor)
        formData.set("hexColor", colors[index].hexColor)
        formData.delete("colorName")
        formAction(formData)
    }


    return <form action={handleCreateSubject}
                 className="h-96 w-80 bg-bgColor_default p-4 rounded-md relative flex flex-col">
        <h1 className="text-fgColor_default text-xl">Erstelle ein neues Subject</h1>
        <label className="text-fgColor_default mt-4">Name</label>
        <input name="name"
               className="pl-1 w-full h-8 rounded-md border-borderColor_default border bg-transparent text-fgColor_default"/>
        {state.errors?.name && <p className="text-red-500">{state.errors.name[0]}</p>}
        <label>Farbe</label>
        <select name="colorName">{colors.map((color) => <option key={color.hexColor}>{color.name}</option>)}</select>
        {state.errors?.colorName && <p className="text-red-500">{state.errors.colorName[0]}</p>}
        <button
            className="text-bgColor_default bg-bgColor_inverse w-32 rounded-md h-10 absolute right-8 bottom-8">{pending ?
            <Loading/> : "Erstellen"}
        </button>
    </form>
}