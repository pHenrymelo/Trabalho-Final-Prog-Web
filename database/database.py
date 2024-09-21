from peewee import *
from dotenv import load_dotenv
import os

load_dotenv()

db = PostgresqlDatabase(
    'MagicForms',
    user = os.getenv('USER'),
    password = os.getenv('PASSWORD'),
    host = os.getenv('HOST'),
    port = os.getenv('PORT'),
)