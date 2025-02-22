

from pydantic import BaseModel


class ExerciseNormal(BaseModel):
    question:str
    answer:str

class ExerciseMultipleChoice(BaseModel):
    question:str
    choices:list[str]
    answer:str