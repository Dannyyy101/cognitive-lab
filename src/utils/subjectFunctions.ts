import {SubjectDTO} from "@/types/dtos/subjectDTO";

export const displayChildSubjects = (children:SubjectDTO[]) => {
    if(children.length > 3){
        children.slice(0, 3)
    }
    // TODO ADD ... if there are more than 3 children

    return children.map((child) => child.name).join(", ").replace(/,([^,]*)$/, " und$1 ")
}