import { SubjectDTO } from "@/types/dtos/subjectDTO";

export const displayChildSubjects = (children: SubjectDTO[]) => {
    if (children.length > 3) {
        children.slice(0, 3)
    }
    // TODO ADD ... if there are more than 3 children

    return children.map((child) => child.name).join(", ").replace(/,([^,]*)$/, " und$1 ")
}

export const difficulties = ['Very Easy', 'Easy', 'Medium', 'Hard', 'Really Hard']

export const mapSubjectRatingToText = (rating: number) => {
    if (rating > difficulties.length || rating <= 0) {
        throw new Error("Illegal rating, expected a range between 1 to 5")
    }
    return difficulties[rating - 1]
}

export const mapSubjectRatingFromText = (rating: string) => {
    const result = difficulties.findIndex((e) => e === rating)
    if (result === -1) {
        throw new Error("Illegal difficulty.")
    }
    return result + 1
}