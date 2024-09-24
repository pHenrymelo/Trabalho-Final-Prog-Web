from flask import Blueprint, render_template

forms_routes = Blueprint('forms', __name__)

@forms_routes.route('/')
def formList():
    return render_template('/formularios/formlist.html')

@forms_routes.route('/formulario')
def form():
    return render_template('/formularios/magicform.html')

@forms_routes.route('/editForm')
def edit():
    return render_template('/formularios/magicform.html')

@forms_routes.route('/formularios/viewform.html')
def details():
    return render_template('/formularios/viewform.html')

@forms_routes.route('/confirmarDeletar')
def delete():
    return render_template('/formularios/deleteform.html')