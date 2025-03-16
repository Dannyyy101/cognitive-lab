import {ExerciseImageComponent} from "@/types/dtos/exerciseDTO";
import React from "react";
import Image from "next/image";

export const ExerciseImageView = ({exercise, key}: { exercise: ExerciseImageComponent, key: string }) => {
    // TODO GET IMAGE WIDTH AND HEIGHT
    return <div key={key}>{exercise.imageUrl.length > 0 && <Image src={exercise.imageUrl} alt="image-url" width={128} height={128}/>} </div>
}