import { getSubjectById } from "@/actions/subjectActions";
import { Loading } from "@/components/Loading";
import { Subject } from "@/types/models/subject";
import { createContext, useContext, useEffect, useState } from "react";

interface SubjectProviderProps {
  children: React.ReactNode;
  subjectId: string;
}

interface SubjectContextType {
  subject: Subject;
  setSubject: (subject: Subject) => void;
}

const SubjectContext = createContext<SubjectContextType | undefined>(undefined);

export const SubjectProvider: React.FC<SubjectProviderProps> = ({
  children,
  subjectId,
}) => {
  const [subject, setSubject] = useState<Subject | null>(null);

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const result = await getSubjectById(subjectId);
        setSubject(result);
      } catch (error) {
        console.error("Failed to fetch subject:", error);
      }
    };

    fetchSubject();
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
