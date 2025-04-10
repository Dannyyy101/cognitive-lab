import {getAllExercises} from "@/actions/exerciseActions";
import {getExerciseViewByType} from "@/utils/exerciseFunctions";

export default async function Exercises() {

    const exercises = await getAllExercises();
    return (
        <main className="w-screen mt-32 flex justify-center">
            <section className="w-11/12 flex">
                <table className="w-full border-borderColor_default border rounded-md text-left">
                    <thead>
                    <tr className="h-10">
                        <th className="text-fgColor_default pl-4">Frage</th>
                        <th className="text-fgColor_default pl-4">Antwort</th>
                    </tr>
                    </thead>
                    <tbody>
                    {exercises.map((exercise, index) =>
                        <tr key={index} className="border-borderColor_default border text-fgColor_default ">
                            <td className="ml-4 my-1 items-center max-w-52">
                                <div className="pl-2">{getExerciseViewByType(exercise?.question[0], "question" + index)}</div>
                            </td>
                            <td className="flex ml-4 my-1 items-center max-w-52">
                                <div className="pl-2">{getExerciseViewByType(exercise?.answer[0], "answer" + index)}</div>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </section>
        </main>
    )
}