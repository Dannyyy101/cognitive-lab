from typing import Annotated, Union

from fastapi import Depends, FastAPI
from sqlmodel import SQLModel, Session, create_engine

from api.entity.Example import Hero
from . import engine

app = FastAPI()

def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]

@app.post("/api/heroes/")
def create_hero(hero: Hero, session: SessionDep) -> Hero:
    session.add(hero)
    session.commit()
    session.refresh(hero)
    return hero

@app.get("/api/python")
def read_root(session: SessionDep):
    return None


