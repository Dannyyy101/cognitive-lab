import { getSubjectById } from "@/actions/subjectActions";
import { Loading } from "@/components/Loading";
import React, { createContext, useContext, useEffect, useState } from "react";
import { SubjectDTO } from "@/types/dtos/subjectDTO";

interface SubjectProviderProps {
  children: React.ReactNode;
  subjectId?: string;
}

interface SubjectContextType {
  subject: SubjectDTO;
  setSubject: (subject: SubjectDTO) => void;
}

const SubjectContext = createContext<SubjectContextType | undefined>(undefined);

export const SubjectProvider: React.FC<SubjectProviderProps> = ({
  children,
  subjectId,
}) => {
  const [subject, setSubject] = useState<SubjectDTO | null>(null);

  useEffect(() => {
    if (subjectId) {
      try {
        getSubjectById(subjectId, {resolveAll: true}).then((result) => setSubject(JSON.parse(result)));
      } catch (error) {
        console.error("Failed to fetch subject:", error);
      }
    } else {
      setSubject({
        id: "",
        parent: null,
        name: "",
        exercises: [],
        children: [],
        lastEdited: new Date(),
        color: "",
        bgColor: "",
        createdOn: new Date(),
      });
    }
  }, [subjectId]);

  if (!subject) return <Loading />;

  return (
    <SubjectContext.Provider value={{ subject, setSubject }}>
      {children}
    </SubjectContext.Provider>
  );
};

export const useSubject = () => {
  const context = useContext(SubjectContext);
  if (context === undefined) {
    throw new Error("useSubject must be used within an SubjectProvider");
  }
  return context;
};
