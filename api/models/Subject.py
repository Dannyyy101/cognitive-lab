
from typing import Optional
from pydantic import BaseModel

from api.models.Exercise import ExerciseBase


class Subject(BaseModel):
    name:str
    color:str
    exersies: Optional[list[ExerciseBase]] = None