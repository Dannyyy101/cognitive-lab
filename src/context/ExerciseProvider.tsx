import { getExerciseById } from "@/actions/exerciseActions";
import { Loading } from "@/components/Loading";
import { CombinedExerciseDTO } from "@/types/dtos/exerciseDTO";
import { createContext, useContext, useEffect, useState } from "react";

interface ExerciseProviderProps {
  children: React.ReactNode;
  exerciseId?: string;
  oldExercise?: CombinedExerciseDTO;
}

interface ExerciseContextType {
  exercise: CombinedExerciseDTO;
  setExercise: (exercise: CombinedExerciseDTO) => void;
}

const ExerciseContext = createContext<ExerciseContextType | undefined>(
  undefined
);

export const ExerciseProvider: React.FC<ExerciseProviderProps> = ({
  children,
  exerciseId,
  oldExercise,
}) => {
  const [exercise, setExercise] = useState<CombinedExerciseDTO | null>(null);

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
            answer: "",
            choices: [],
            question: "",
            type: "",
          });
        }
      } catch (error) {
        console.error("Failed to fetch subject:", error);
      }
    };

    fetchExercise();
  }, [exerciseId]);

  if (!exercise) return <Loading />;

  return (
    <ExerciseContext.Provider value={{ exercise, setExercise }}>
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
