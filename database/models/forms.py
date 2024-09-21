from peewee import *
from database.database import db

class BaseModel(Model):
    class Meta:
        database = db
        
class Form(BaseModel):
    title = CharField(max_length=200)
    description = TextField()
    
class Question(BaseModel):
    form = ForeignKeyField(Form, backref='questions')
    statemant = TextField()
    type = CharField(max_length=20)
    
class Option(BaseModel):
    question = ForeignKeyField(Question, backref='options')
    text = TextField()