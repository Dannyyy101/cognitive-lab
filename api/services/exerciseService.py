
from api.models.Exercise import ExerciseNormal, ExerciseMultipleChoice
from api import db

collection = "exercises"

def create_new_exercise(exercise:ExerciseNormal | ExerciseMultipleChoice | str):
        doc_ref = db.collection(collection).document()
        doc_ref.set(exercise.model_dump())

