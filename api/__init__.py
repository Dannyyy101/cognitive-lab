import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import os
from dotenv import load_dotenv

load_dotenv()


cred = {
  "type": os.getenv('FIREBASE_SERVICE_ACCOUNT'),
  "project_id": os.getenv('FIREBASE_PROJECT_ID'),
  "private_key_id": os.getenv('FIREBASE_PRIVAT_KEY_ID'),
  "private_key": os.getenv('FIREBASE_PRIVAT_KEY').replace('\\n', '\n'),
  "client_email": os.getenv('FIREBASE_CLIENT_EMAIL'),
  "client_id": os.getenv('FIREBASE_CLIENT_ID'),
  "auth_uri": os.getenv('FIREBASE_AUTH_URI'),
  "token_uri": os.getenv('FIREBASE_TOKEN_URI'),
  "auth_provider_x509_cert_url": os.getenv('FIREBASE_AUTH_PROVIDER_X590_CERT_URL'),
  "client_x509_cert_url": os.getenv('FIREBASE_CLIENT_x590_CERT_URL'),
  "universe_domain": os.getenv('FIREBASE_UNIVERSE_DOMAIN'),
}

cred = credentials.Certificate(cred)

app = firebase_admin.initialize_app(cred)

db = firestore.client()