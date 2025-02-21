from sqlmodel import Field, SQLModel

class Exercise(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    question: str
    answer: str
    subject: str