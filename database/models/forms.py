from peewee import *
from database.database import db

class BaseModel(Model):
    class Meta:
        database = db
        
class Form(BaseModel):
    form_title = CharField(max_length=200)
    form_description = TextField()
    
class Question(BaseModel):
    form = ForeignKeyField(Form, backref='questions')
    question_statemant = TextField()
    question_type = CharField(max_length=20)
    
class Option(BaseModel):
    question = ForeignKeyField(Question, backref='options')
    option_text = TextField()