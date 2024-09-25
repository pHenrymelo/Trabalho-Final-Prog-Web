
formContainer = document.getElementById('magicform')
formActions = document.querySelector('.form-actions')
btnSubmit = document.getElementById('btn-submit')
btnAddField = document.getElementById('btn-addField')

let questionCount = 0;

const addField = () => {

    const questionField = document.createElement('div');
    questionField.classList.add('question-container');
    questionField.dataset.id = questionCount;

    const questionStatement = document.createElement('input');
    questionStatement.type = 'text';
    questionStatement.placeholder = 'O enunciado da pergunta vai aqui...'
    questionStatement.name = `questionStatement_${questionCount}`
    questionStatement.required = true;

    const questionType = document.createElement('select');
    questionType.classList.add('questionType-selector')
    questionType.name = `questionType_${questionCount}`
    questionType.required = true;
    questionType.innerHTML = `
        <option value="short">Resposta Curta</option>
        <option value="long">Resposta Longa</option>
        <option value="multipleChoice">Múltipla Escolha</option>
        <option value="selection">Caixa de Seleção</option>
    `

    const questionOptions = document.createElement('div');
    questionOptions.id = `questionOptions_${questionCount}`;
    questionOptions.classList.add('option-container');

    const btnAddOption = document.createElement('input');
    btnAddOption.type = 'button';
    btnAddOption.value = 'Adicionar Alternativa';
    btnAddOption.id = 'btn-add'
    btnAddOption.addEventListener('click', () => {
        createOptionField(questionOptions)
    });

    const btnRemoveQuest = document.createElement('input');
    btnRemoveQuest.type = 'button';
    btnRemoveQuest.value = 'Remover Questão';
    btnRemoveQuest.id = 'btn-remove'
    btnRemoveQuest.addEventListener('click', () => {
        questionField.remove();
    });

    questionType.addEventListener('change', (e) => {
        if (e.target.value === 'multipleChoice' || e.target.value === 'selection'){
            btnAddOption.style.display = 'block';
            questionOptions.style.display = 'block';
        } else {
            btnAddOption.style.display = 'none';
            questionOptions.style.display = 'none';
            questionOptions.innerHTML = '';
        }
    });

    questionField.appendChild(questionStatement);
    questionField.appendChild(questionType);
    questionField.appendChild(btnAddOption);
    questionField.appendChild(btnRemoveQuest);
    questionField.appendChild(questionOptions);

    questionCount++;
    return questionField;
}

const createOptionField = (questionField) => {
    const optionField = document.createElement('div');
    optionField.classList.add('option-container');

    const optionText = document.createElement('input');
    optionText.type = 'text';
    optionText.placeholder = 'O conteudo da alternativa vai aqui...';

    const btnRemoveOption = document.createElement('input');
    btnRemoveOption.type = 'button';
    btnRemoveOption.value = 'Remover alternativa';
    btnRemoveOption.id = 'btn-remove'
    btnRemoveOption.addEventListener('click', () => {
        optionField.remove();
    })

    optionField.appendChild(optionText);
    optionField.appendChild(btnRemoveOption);
    questionField.appendChild(optionField);

}

btnAddField.addEventListener('click', () => {
    const newField = addField();
    formContainer.insertBefore(newField, formActions);
    
});


formContainer.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        questions: []
    };

    const questionContaiers = document.querySelectorAll('.question-container');
    questionContaiers.forEach((container) => {
        const questionData = {
            questionStatement: container.querySelector('input[type="text"]').value,
            questionType: container.querySelector('select').value,
            options: []
        };

        if (questionData.questionType === 'multipleChoice' || questionData.questionType === 'selection'){
            const options = container.querySelectorAll('.option-container input[type="text"]');
            options.forEach(option => questionData.options.push(option.value))
        }

        formData.questions.push(questionData);
    });

    btnSubmit.disabled = true;
    btnSubmit.value = 'Enviando...';

    const formTileElement = document.getElementById('form-title');
    const formId = formTileElement ? formTileElement.dataset.id : null;
    const method = formId === null ? 'POST' : 'PUT';
    const url = formId === null ? `/magicforms/formulario` : `/magicforms/formulario/${formId}/editar`;


    axios({
        method: method,
        url: url,
        data: formData
    })
    .then(res => {
        console.log(res.data);
        formContainer.reset();
        document.querySelectorAll('.question-container').forEach(element => element.remove());
        questionCount = 0;
        window.location.href = '/magicforms';
    })
    .catch(err => {
        console.error(err);
        alert('Ocorreu um erro ao enviar o formulário');
    })
    .finally(() => {
        btnSubmit.disabled = false;
        btnSubmit.value = 'Enviar';
    });

});