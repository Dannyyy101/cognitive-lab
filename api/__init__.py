from sqlmodel import create_engine
import os
from dotenv import load_dotenv

load_dotenv()

sqlite_url = os.getenv("STORAGE_URL")

engine = create_engine(sqlite_url)