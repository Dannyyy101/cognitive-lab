
from api.models.Subject import Subject
from api import db

collection = "subjects"


def create_new_subject(subject:Subject):
    doc_ref = db.collection(collection).document()
    doc_ref.set(subject.model_dump())

def select_all_subjects():
    ref = db.collection("subjects")
    docs = ref.stream()

    result = []
    for doc in docs:
        temp:dict = doc.to_dict()
        temp['id'] = doc.id
        temp['exercises'] = [] # TODO implement DTO's
        result.append(temp)
    return result

def find_subject_by_id(subject_id):
    doc_ref = db.collection("subjects").document(subject_id)
    doc = doc_ref.get()
    dict = doc.to_dict()
    dict["exercises"] = resolve_references(dict["exercises"])
    return dict

def update_subject_by_id(id, subject):
    doc_ref = db.collection(collection).document(id)
    temp = {k: v for k, v in subject.model_dump().items() if v is not None}
    doc_ref.set(temp, merge=True)
    


def resolve_references(references):
    resolved_docs = []
    for ref in references:
        doc = ref.get()
        if doc.exists:
            temp = doc.to_dict()
            temp["id"] = doc.id
            resolved_docs.append(temp)
        else:
            print(f"Document {ref.id} does not exist.")
    return resolved_docs