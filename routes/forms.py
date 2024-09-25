from flask import Blueprint, render_template

forms_routes = Blueprint('forms', __name__)

@forms_routes.route('/')
def formList():
    return render_template('/forms/formlist.html')

@forms_routes.route('/formulario')
def form():
    return render_template('/forms/magicform.html')

@forms_routes.route('/editForm')
def edit():
    return render_template('/forms/magicform.html')

@forms_routes.route('/forms/viewform.html')
def details():
    return render_template('/forms/viewform.html')

@forms_routes.route('/confirmarDeletar')
def delete():
    return render_template('/forms/deleteform.html')