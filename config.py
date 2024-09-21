from peewee import *
from database.database import db
from database.models.forms import Form, Question, Option

from routes.home import home_routes, about

def configure_all(app):
    configure_routes(app)
    configure_db()
    
def configure_routes(app):
    app.register_blueprint(home_routes)

def configure_db():
    db.connect()
    db.create_tables([
        Form,
        Question,
        Option,
    ])
    