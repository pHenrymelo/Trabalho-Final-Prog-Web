from peewee import *
from database.database import db

class BaseModel(Model):
    class Meta:
        database = db
        
class Form(BaseModel):
    form_title = CharField(max_length=200)
    form_description = TextField()
    
    def add_question(self, question_statement, question_type):
        return Question.create(form=self, question_statement=question_statement, question_type=question_type)
    
class Question(BaseModel):
    form = ForeignKeyField(Form, backref='questions')
    question_statement = TextField()
    question_type = CharField(max_length=20)
    
    def add_option(self, option_text):
        if self.question_type in ['multiple_choice', 'selection']:
            return Option.create(question=self, option_text=option_text)
        else:
            raise ValueError("Somente perguntas de multipla escolha ou caixas de seleção podem ter alternativas")   
        
class Option(BaseModel):
    question = ForeignKeyField(Question, backref='options')
    option_text = TextField()