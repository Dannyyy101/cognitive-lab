from api import db
from api.models.Exercise import ExerciseMultipleChoice, ExerciseNormal
from api.services.exerciseService import create_new_exercise, remove_exercise_by_id, select_all_exercises, update_exercise_by_id

from fastapi import APIRouter

router = APIRouter(prefix="/api")

@router.get("/exercises")
def get_all_exercises():
    return select_all_exercises()

@router.post("/exercises")
def post_new_exercise(exercise: ExerciseNormal | ExerciseMultipleChoice, subject_id:str | None = None):
    create_new_exercise(exercise, subject_id)
    
@router.put("/exercises/{exercise_id}")
def put_exercise_by_id(exercise_id, exercise: ExerciseNormal | ExerciseMultipleChoice):
    update_exercise_by_id(exercise_id, exercise)
    
@router.delete("/exercises/{exercise_id}")
def delete_exercise_by_id(exercise_id:str):
    remove_exercise_by_id(exercise_id)