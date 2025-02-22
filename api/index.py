
from fastapi import FastAPI

from api.models.Exercise import ExerciseNormal, ExerciseMultipleChoice
from api.services.exerciseService import create_new_exercise
from . import db

app = FastAPI()


@app.get("/api/exercises")
def get_all_exercises():
    users_ref = db.collection("exercises")
    docs = users_ref.stream()

    result = []
    for doc in docs:
        result.append(doc.to_dict())
    return result

@app.post("/api/exercises")
def create_hero(exercise: ExerciseNormal | ExerciseMultipleChoice):
    create_new_exercise(exercise)
