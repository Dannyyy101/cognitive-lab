from fastapi import APIRouter
from api.models.Subject import Subject
from api.services.subjectService import create_new_subject, find_subject_by_id, select_all_subjects, update_subject_by_id

router = APIRouter(prefix="/api")

@router.post("/subjects")
def post_new_subject(subject: Subject):
    create_new_subject(subject)

@router.get("/subjects")
def get_all_subjects():
    return select_all_subjects()

@router.get("/subjects/{subject_id}")
def get_subject_by_id(subject_id):
    return find_subject_by_id(subject_id)

@router.put("/subjects/{subject_id}")
def put_subject_by_id(subject_id, subject:Subject):
    return update_subject_by_id(subject_id, subject)