import React, {useState} from "react";
import {SubjectDTO} from "@/types/dtos/subjectDTO";
import {useSubject} from "@/context/SubjectProvider";
import {createNewSubject} from "@/actions/subjectActions";

interface CreateSubjectProps {
    children?: React.ReactNode
}

export const CreateSubject: React.FC<CreateSubjectProps> = ({children: _children}) => {
    const {subject, setSubject} = useSubject()
    const [newSubject, setNewSubject] = useState<SubjectDTO>({
        id: "",
        parent: subject,
        name: "",
        children: [],
        createdOn: new Date(),
        color: "",
        exercises: [],
        lastEdited: new Date()
    })

    const colorOptions = [{name: "red", hexCode: "#ce222d"}, {name: "green", hexCode: "#1c883c"}]

    const handleSaveNewSubject = async () => {
        await createNewSubject({...newSubject, createdOn: new Date, lastEdited: new Date})
        // TODO UPDATE PARENT SUBJECT
        const temp = subject.children
        temp.push(newSubject)
        setSubject({...subject, children: temp})
    }

    return (
        <section className="flex flex-col items-center h-[40rem] relative w-[60rem]">
            <h1 className="text-3xl font-bold mt-8">Create new subject</h1>
            <section className="w-2/3 flex flex-col items-center mt-8">
                <label className="text-fgColor_default text-xl w-2/3">name</label>
                <input
                    className="resize-none border border-bgColor_neutral_emphasis pl-1 w-2/3 h-10 rounded-md focus:outline-none"
                    value={newSubject.name} onChange={(e) => setNewSubject({...newSubject, name: e.target.value})}/>
                <select className="w-2/3 mt-2" value={newSubject.color}
                        onChange={(e) => setNewSubject({...newSubject, color: e.target.value})}>
                    {colorOptions.map((option) =>
                        <option key={option.hexCode}
                                value={option.hexCode}>{option.name}</option>)}
                </select>
                <button onClick={handleSaveNewSubject}>save</button>
            </section>
        </section>
    );
};
