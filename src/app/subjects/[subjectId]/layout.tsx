'use client'
import {SubjectProvider} from "@/context/SubjectProvider";
import {useParams} from "next/navigation";
import {ReactNode} from "react";

export default function Layout({children}: { children: ReactNode }) {
    const params = useParams<{ subjectId: string }>();

    return (
        <SubjectProvider subjectId={params.subjectId}>{children}</SubjectProvider>
    );
}
