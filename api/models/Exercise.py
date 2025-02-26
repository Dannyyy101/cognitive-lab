class ExerciseBase():
    type:str

class ExerciseNormal(ExerciseBase):
    question:str
    answer:str
    

class ExerciseMultipleChoice(ExerciseBase):
    question:str
    choices:list[str]
    answer:str
