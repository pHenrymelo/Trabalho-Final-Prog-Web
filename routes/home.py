from flask import Blueprint, render_template

home_routes = Blueprint('home', __name__)

@home_routes.route('/')
def index():
    return render_template('/home/home.html')

@home_routes.route('/sobre')
def about():
    return render_template('/about/about.html')