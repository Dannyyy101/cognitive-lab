
from api.models.Exercise import ExerciseNormal, ExerciseMultipleChoice
from api import db
from api.services.subjectService import find_subject_by_id, update_subject_by_id

collection = "exercises"


def select_all_exercises():
    users_ref = db.collection(collection)
    docs = users_ref.stream()

    result = []
    for doc in docs:
        result.append(doc.to_dict())
    return result


def create_new_exercise(exercise: ExerciseNormal | ExerciseMultipleChoice, subject_id):
    # Create a new document reference and get its ID
    doc_ref = db.collection(collection).document()
    doc_id = doc_ref.id  # Get the document ID before setting the data

    # Set the document data
    doc_ref.set(exercise.model_dump())

    # Print the document ID for debugging
    print(f"Created exercise with ID: {doc_id}")

    # If a subject_id is provided, update the subject's exercises list
    if subject_id:
        subject = find_subject_by_id(subject_id)
        if subject:
            temp = subject.get("exercises", [])  # Ensure the exercises list exists
            temp.append(doc_id)  # Append the new exercise ID
            update_subject_by_id(subject_id, subject)  # Update the subject
        else:
            print(f"Subject with ID {subject_id} not found.")
        

def update_exercise_by_id(id, exercise:ExerciseNormal | ExerciseMultipleChoice):
        doc_ref = db.collection(collection).document(id)
        doc_ref.update(exercise.model_dump())
        
        
def remove_exercise_by_id(exercise_id:str):
    db.collection(collection).document(exercise_id).delete()