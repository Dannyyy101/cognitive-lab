import React, { useState } from "react";
import { SubjectDTO } from "@/types/dtos/subjectDTO";
import { useSubject } from "@/context/SubjectProvider";
import { createNewSubject } from "@/actions/subjectActions";
import { usePopUpClose } from "@/context/PopUpContext";

interface CreateSubjectProps {
  children?: React.ReactNode;
}

export const CreateSubject: React.FC<CreateSubjectProps> = ({
  children: _children,
}) => {
  const { subject, setSubject } = useSubject();
  const [newSubject, setNewSubject] = useState<SubjectDTO>({
    id: "",
    parent: subject,
    name: "",
    children: [],
    createdOn: new Date(),
    color: "",
    exercises: [],
    lastEdited: new Date(),
    bgColor: "",
  });
  const handlePopUpClose = usePopUpClose();
  const colorOptions = [
    { name: "red", hexCode: "#ce222d" },
    { name: "green", hexCode: "#1c883c" },
  ];

  const handleSaveNewSubject = async () => {
    const id = await createNewSubject({
      ...newSubject,
      createdOn: new Date(),
      lastEdited: new Date(),
    });
    const temp = subject.children;
    temp.push({ ...newSubject, id: id });
    setSubject({ ...subject, children: temp });
    handlePopUpClose();
  };

  return (
    <section className="flex flex-col items-center h-[40rem] relative w-[60rem]">
      <h1 className="text-3xl font-bold mt-8">Create new subject</h1>
      <section className="w-2/3 flex flex-col  mt-8">
        <label className="text-fgColor_default text-xl w-2/3">name</label>
        <input
          className="resize-none border border-bgColor_neutral_emphasis pl-1 w-2/3 h-10 rounded-md focus:outline-none"
          value={newSubject.name}
          onChange={(e) =>
            setNewSubject({ ...newSubject, name: e.target.value })
          }
        />
        <div className="w-full flex flex-col appearance-none">
          <label>Color</label>
          <select
            className="w-2/3 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-bgColor_neutral_emphasis rounded pl-3 pr-8 py-1.5 transition duration-300 ease focus:outline-none focus:border-bgColor_neutral_emphasis hover:border-bgColor_neutral_emphasis shadow-sm focus:shadow-md appearance-none cursor-pointer"
            value={newSubject.color}
            onChange={(e) =>
              setNewSubject({ ...newSubject, color: e.target.value })
            }
          >
            {colorOptions.map((option) => (
              <option key={option.hexCode} value={option.hexCode}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <button
          className="absolute right-8 bottom-8 w-32 bg-bgColor_accent_emphasis text-fgColor_white h-10 rounded-md flex justify-center items-center"
          onClick={handleSaveNewSubject}
        >
          save
        </button>
      </section>
    </section>
  );
};
