interface SwitchElementProps {
    element: "question" | "answer"
    switchElement: (element: "question" | "answer") => void
}

export const SwitchElement = ({element, switchElement}: SwitchElementProps) => {
    return (<div className="mt-8 bg-bgColor_disabled p-1 flex rounded-t-md">
        <button onClick={() => switchElement("question")}
                className={`rounded-md h-8 w-1/2 ${element === "question" ? "bg-bgColor_default" : "bg-transparent"}`}>Frage
        </button>
        <button onClick={() => switchElement("answer")}
                className={`rounded-md h-8 w-1/2 ${element === "answer" ? "bg-bgColor_default" : "bg-transparent"}`}>Antwort
        </button>

    </div>)
}