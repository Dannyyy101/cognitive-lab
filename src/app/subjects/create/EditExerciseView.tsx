import { uploadFile } from "@/actions/fileActions";
import { ExerciseFileUpload } from "@/components/exercises/display/ExerciseFileUpload";
import { ExerciseTextArea } from "@/components/exercises/display/ExerciseTextArea";
import { Card, CardBottom, CardSection } from "@/components/ui/Card";
import { useSubject } from "@/context/SubjectProvider";
import {
  ExerciseImageComponent,
  ExerciseTextComponent,
} from "@/types/dtos/exerciseDTO";
import { IMAGE_URL } from "@/utils/constants";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

export const EditExerciseView = ({ index }: { index: number }) => {
  const [_image, setImage] = useState<File | null>(null);
  const { subject, setSubject } = useSubject();

  if (!subject.exercises || subject.exercises.length === 0) return null;

  const exercise = subject.exercises.at(index);
  if (!exercise) return null;

  const handleChangeExerciseTextContent = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    type: "question" | "answer",
  ) => {
    const newContent = e.target.value;
    const updatedExercises = [...subject.exercises];

    if (updatedExercises[index][type]?.[0]) {
      updatedExercises[index] = {
        ...updatedExercises[index],
        [type]: [
          {
            ...updatedExercises[index][type][0],
            content: newContent,
          },
          ...updatedExercises[index][type].slice(1),
        ],
      };
    }

    setSubject({ ...subject, exercises: updatedExercises });
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const { data, error: _error } = await uploadFile(file);
      if (data) {
        const updatedExercises = [...subject.exercises];
        (
          updatedExercises[index].question[0] as ExerciseImageComponent
        ).imageUrl = IMAGE_URL + data.fullPath;
        setSubject({ ...subject, exercises: updatedExercises });
        setImage(file);
      }
    }
  };

  let questionComponent = null;
  let answerComponent = null;

  switch (exercise.question?.at(0)?.type) {
    case "text":
      questionComponent = (
        <>
          <label className="mt-2  w-full">Frage</label>
          <ExerciseTextArea
            onChange={(e) => handleChangeExerciseTextContent(e, "question")}
            value={
              (exercise.question?.at(0) as ExerciseTextComponent)?.content ?? ""
            }
            placeholder="Gib hier deine Frage ein"
          />
        </>
      );
      break;
    case "image":
      questionComponent = (
        <>
          <label className="mt-2 w-full">Frage</label>
          <ExerciseFileUpload
            onChange={(e) => handleFileChange(e)}
            placeholder="Gib hier deine Frage ein"
          />
          {(exercise.question[0] as ExerciseImageComponent).imageUrl && (
            <Image
              src={(exercise.question[0] as ExerciseImageComponent).imageUrl}
              alt="uploaded-image"
              width={64}
              height={64}
            />
          )}
        </>
      );
      break;
  }

  switch (exercise.answer?.at(0)?.type) {
    case "text":
      answerComponent = (
        <>
          <label className="mt-2 w-full">Antwort</label>
          <ExerciseTextArea
            value={
              (exercise.answer?.at(0) as ExerciseTextComponent)?.content ?? ""
            }
            onChange={(e) => handleChangeExerciseTextContent(e, "answer")}
            placeholder="Gib hier deine Antwort ein"
          />
        </>
      );
      break;
  }

  const handleChangeDocumentationUrl = (e: string) => {
    const temp = [...subject.exercises];
    temp[index] = { ...exercise, documentationUrl: e };
    setSubject({ ...subject, exercises: temp });
  };

  return (
    <Card>
      <CardSection>
        {questionComponent}
        {answerComponent}
      </CardSection>
      <CardBottom>
        <input
          value={exercise.documentationUrl}
          onChange={(e) => handleChangeDocumentationUrl(e.target.value)}
          className="pl-1 rounded-md w-40 h-10 border border-borderColor_default"
          placeholder="Doku Link"
        />
      </CardBottom>
    </Card>
  );
};
