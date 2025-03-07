import { getAllSubjects } from "@/actions/subjectActions";
import { Loading } from "@/components/Loading";
import { SubjectDTO } from "@/types/dtos/subjectDTO";
import Link from "next/link";
import { ReactNode } from "react";

export default async function Page(): Promise<ReactNode> {
  const subjects = await getAllSubjects();

  if (!subjects) {
    return <Loading />;
  }
  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <section className="flex items-center justify-center flex-wrap">
      {subjects.filter((subject) => subject.parent === null).map((s) =>
          <SubjectDisplay subject={s} key={s.id} />
      )}
      </section>
    </main>
  );
}

interface SubjectDisplayProps {
  subject: SubjectDTO;
}

const SubjectDisplay: React.FC<SubjectDisplayProps> = ({ subject }) => {
  return (
    <Link
      href={`./subjects/${subject.id}`}
      className="w-80 h-44 rounded-md m-2"
      style={{ backgroundColor: subject.color }}
    >
      <h1 className="text-fgColor_white text-2xl pl-4 pt-2">{subject.name}</h1>
    </Link>
  );
};
