from flask import Blueprint, render_template

forms_routes = Blueprint('forms', __name__)

@forms_routes.route('/magicform')
def magicform():
    return render_template('/forms/magicform.html')