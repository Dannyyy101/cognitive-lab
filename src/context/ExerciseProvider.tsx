import {getExerciseById} from "@/actions/exerciseActions";
import {Loading} from "@/components/Loading";
import React, {createContext, useContext, useEffect, useState} from "react";
import {ExerciseBaseDTO} from "@/types/dtos/exerciseDTO";

interface ExerciseProviderProps {
    children: React.ReactNode;
    exerciseId?: string;
    oldExercise?: ExerciseBaseDTO;
}

interface ExerciseContextType {
    exercise: ExerciseBaseDTO;
    setExercise: (exercise: ExerciseBaseDTO) => void;
}

const ExerciseContext = createContext<ExerciseContextType | undefined>(
    undefined
);

export const ExerciseProvider: React.FC<ExerciseProviderProps> = ({
                                                                      children,
                                                                      exerciseId,
                                                                      oldExercise,
                                                                  }) => {
    const [exercise, setExercise] = useState<ExerciseBaseDTO | null>(null);

    useEffect(() => {
        const fetchExercise = async () => {
            try {
                if (exerciseId) {
                    const result = await getExerciseById(exerciseId);
                    setExercise(result);
                } else if (oldExercise) {
                    setExercise(oldExercise);
                } else {
                    setExercise({
                        id: "",
                        answer: [],
                        question: [],
                        createdOn: new Date(),
                        lastEdited: new Date(),
                        documentationUrl: "",
                        authorId: ""
                    });
                }
            } catch (error) {
                console.error("Failed to fetch subject:", error);
            }
        };

        fetchExercise();
    }, [exerciseId, oldExercise]);

    if (!exercise) return <Loading/>;

    return (
        <ExerciseContext.Provider value={{exercise, setExercise}}>
            {children}
        </ExerciseContext.Provider>
    );
};

export const useExercise = () => {
    const context = useContext(ExerciseContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
