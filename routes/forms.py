from flask import Blueprint, render_template, request, jsonify
from database.models.forms import Form, Question, Option
from playhouse.shortcuts import model_to_dict, dict_to_model
from peewee import *

forms_routes = Blueprint('forms', __name__)

@forms_routes.route('/', methods=['GET'])
def formList():
    forms = Form.select().order_by(Form.id.asc())
    return render_template('/forms/formlist.html', forms = forms)

@forms_routes.route('/formulario', methods=['GET', 'POST'])
def form():
    if request.method == 'POST':
        data = request.get_json()
        
        try:
            form = Form.create(form_title = data['title'], form_description=data['description'])
            
            for question_data in data['questions']:
                question = Question.create(
                    form = form,
                    question_statement = question_data['questionStatement'],
                    question_type = question_data['questionType']
                )
                
                if question_data['questionType'] == 'multipleChoice' or question_data['questionType'] == 'selection':
                    for option in question_data['options']:
                        Option.create(question=question, option_text=option)
                        
            return jsonify(model_to_dict(form, recurse=True)), 201
        
        except Exception as e:
            return jsonify({'error': str(e)}), 400
    
    else:
        return render_template('/forms/magicform.html')

@forms_routes.route('/formulario/<int:id>', methods=['GET'])
def details(id):
    form = Form.get_by_id(id)
    form = model_to_dict(form)
    return render_template('/forms/viewform.html', form=form)

@forms_routes.route('/formulario/<int:id>/editar', methods=['GET', 'PUT'])
def edit(id):
    try:
        form = Form.get_by_id(id)
    except DoesNotExist:
        return jsonify({'error': 'Formulario não encontrado'}), 404
    
    if request.method == 'PUT':
        data = request.get_json()
        
        try:
            form.form_title = data['title']
            form.form_description = data['description']
            form.save()
                
            for question in form.questions:
                for option in question.options:
                    option.delete_instance()
                question.delete_instance()
            for question_data in data['questions']:
                question = Question.create(
                    form = form,
                    question_statement = question_data['questionStatement'],
                    question_type = question_data['questionType']
                )
                if question_data['questionType'] in ['multipleChoice', 'selection']:
                    for option in question_data['options']:
                        Option.create(question=question, option_text=option)
                        
            return jsonify(model_to_dict(form, recurse=True)), 200         
        except Exception as e:
            return jsonify({'error': str(e)}), 400
    else:
        return render_template('/forms/magicform.html', form=model_to_dict(form, recurse=True))

@forms_routes.route('/perguntas/<int:id>', methods=['PUT'])
def edit_question(id):
    data = request.get_json()
    question = Question.get_by_id(id)
    question.question_statement = data['statement']
    question.question_type = data['type']
    question.save()
    return jsonify(model_to_dict(question))
    
@forms_routes.route('alternativas/<int:id>', methods=['PUT'])
def  edit_option(id):
    data = request.get_json()
    option = Question.get_by_id(id)
    option.option_text = data['text']
    option.save()
    return jsonify(model_to_dict(option))
    
@forms_routes.route('/formulario/<int:id>/delete', methods=['GET', 'DELETE'])
def delete(id):
    if request.method == 'DELETE':
        form = Form.get_by_id(id)
        form.delete_instance()
        return jsonify({'status': 'Formulario deletado com sucesso'}), 200
    else:
        return render_template('/forms/deleteform.html', form_id=id)