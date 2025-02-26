from typing import Optional
from pydantic import BaseModel

class ExerciseBaseDTO(BaseModel):
    id:Optional[str] = None
    type:str

class ExerciseNormalDTO(ExerciseBaseDTO):
    question:str
    answer:str
    

class ExerciseMultipleChoiceDTO(ExerciseBaseDTO):
    question:str
    choices:list[str]
    answer:str
