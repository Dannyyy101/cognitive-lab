from fastapi import FastAPI
from api.controller import exerciseController, subjectController # Importiere alle Router

app = FastAPI()

# Bindet die Routen in die Haupt-App ein
app.include_router(exerciseController.router)
app.include_router(subjectController.router)


@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI app!"}