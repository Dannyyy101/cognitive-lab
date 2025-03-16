import {useExercise} from "@/context/ExerciseProvider";
import Image from "next/image";
import fileIcon from "../../../media/file.svg"
import plusIcon from "../../../media/plus.svg"
import trashIcon from "../../../media/trash.svg"
import {ExerciseImageComponent, ExerciseTextComponent} from "@/types/dtos/exerciseDTO";

interface ExerciseEditViewProps {
    element: "question" | "answer"
    showAddExercisesComponents: () => void
}

export const ExerciseEditView = ({element, showAddExercisesComponents}: ExerciseEditViewProps) => {
    const {exercise, setExercise} = useExercise()

    const handleRemoveElementFromExercise = (index: number) => {
        const temp = [...exercise[element]]
        temp.splice(index, 1)
        setExercise({...exercise, [element]: temp})
    }

    return <section className="flex flex-col border-borderColor_default border p-8 rounded-b-md relative">
        <button
            className="z-40 absolute top-0 right-4 mt-4 w-60 h-10 border border-borderColor_default rounded-md flex justify-center items-center font-semibold"
            onClick={showAddExercisesComponents}><Image className="mr-1" src={plusIcon}
                                                        alt={"plus-icon"}/> Komponenten hinzufügen
        </button>
        <h1 className="text-2xl font-bold">{element === "answer" ? "Antwort" : "Frage"}</h1>
        {exercise[element].length === 0 ?
            <div
                className="mt-2 h-96 border border-borderColor_default border-dashed flex justify-center items-center flex-col rounded-md">
                <Image src={fileIcon} alt={"file-icon"} width={48} height={48}/>
                <p>Noch keine Komponenten hinzugefügt</p>
                <p>Klicke den &#34;Komponenten hinzufügen&#34; Knopf um Text, Bilder und Code Snippets hinzuzufügen</p>
                <button
                    className="mt-4 w-60 h-10 border border-borderColor_default rounded-md flex justify-center items-center font-semibold"
                    onClick={showAddExercisesComponents}><Image className="mr-1" src={plusIcon}
                                                                alt={"plus-icon"}/> Komponenten hinzufügen
                </button>
            </div>
            : exercise[element].map((e, index) => {
                switch (e.type) {
                    case 'text':
                        return <TextExercise key={index}
                                             handleRemoveElementFromExercise={() => handleRemoveElementFromExercise(index)}
                                             index={index} element={element}/>;
                    case 'image':
                        return <ImageExercise key={index}
                                              handleRemoveElementFromExercise={() => handleRemoveElementFromExercise(index)}
                                              index={index} element={element}/>
                    default:
                        return <div key={index}>Unknown question type</div>;
                }
            })}
    </section>
}


const TextExercise = ({handleRemoveElementFromExercise, index, element}: {
    handleRemoveElementFromExercise: () => void,
    index: number,
    element: "question" | "answer"
}) => {
    const {exercise, setExercise} = useExercise()

    const handleTextChange = (e: string) => {
        const elements = [...exercise[element]];
        elements[index] = {...elements[index], content: e} as ExerciseTextComponent
        setExercise({...exercise, [element]: [...elements,]});
    };

    return <div className="px-4 pt-8 pb-2 border border-borderColor_default rounded-md mt-4 relative">
        <button onClick={handleRemoveElementFromExercise} className="absolute top-2 right-4">
            <Image src={trashIcon} alt={"trash-icon"}/>
        </button>
        <textarea value={(exercise[element][index] as ExerciseTextComponent).content}
                  onChange={(e) => handleTextChange(e.target.value)}
                  className="resize-none border border-borderColor_default w-full rounded-md p-2 mt-2"
                  placeholder="Frage eingeben..."></textarea>
    </div>
}

const ImageExercise = ({handleRemoveElementFromExercise, index, element}: {
    handleRemoveElementFromExercise: () => void,
    index: number,
    element: "question" | "answer"
}) => {
    const {exercise, setExercise} = useExercise()

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageUrl = event.target?.result as string;
                const elements = [...exercise[element]];
                elements[index] = { ...elements[index], imageUrl: imageUrl } as ExerciseImageComponent;
                setExercise({ ...exercise, [element]: elements });
            };
            reader.readAsDataURL(file);
        }
    };

    const imageContent = (exercise[element]?.[index] as ExerciseImageComponent)?.imageUrl;

    return <div className="px-4 pt-8 pb-2 border border-borderColor_default rounded-md mt-4 relative">
        <button onClick={handleRemoveElementFromExercise} className="absolute top-2 right-4">
            <Image src={trashIcon} alt={"trash-icon"}/>
        </button>
        <input className="" type="file" onChange={handleImageChange}/>
        {imageContent && (
            <div className="mt-4">
                <Image src={imageContent} alt="uploaded" width={100} height={100}/>
            </div>
        )}
    </div>
}