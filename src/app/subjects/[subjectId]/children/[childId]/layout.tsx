"use client";
import { SubjectProvider } from "@/context/SubjectProvider";
import { useParams } from "next/navigation";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const params = useParams<{ childId: string }>();
  const subjectId = params.childId;
  return <SubjectProvider subjectId={subjectId}>{children}</SubjectProvider>;
}
