
const formContainer = document.getElementById('magicform')
formActions = document.querySelector('.form-actions')
btnSubmit = document.getElementById('btn-submit')
btnAddField = document.getElementById('btn-addField')

const addField = () => {

    const questionField = document.createElement('div');
    questionField.classList.add('question-container');

    const questionStatement = document.createElement('input');
    questionStatement.type = 'text';
    questionStatement.placeholder = 'O enunciado da pergunta vai aqui...'

    const questionType = document.createElement('select');
    questionType.classList.add('questionType-selector')
    questionType.innerHTML = `
        <option value="short">Resposta Curta</option>
        <option value="long">Resposta Longa</option>
        <option value="multipleChoice">Múltipla Escolha</option>
        <option value="selection">Caixa de Seleção</option>
    `

    const btnAddOption = document.createElement('input');
    btnAddOption.type = 'button';
    btnAddOption.value = 'Adicionar Alternativa';
    btnAddOption.id = 'btn-add'
    btnAddOption.addEventListener('click', () => {
        createOptionField(questionField)
    });

    const btnRemoveQuest = document.createElement('input');
    btnRemoveQuest.type = 'button';
    btnRemoveQuest.value = 'Remover Questão';
    btnRemoveQuest.id = 'btn-remove'
    btnRemoveQuest.addEventListener('click', () => {
        questionField.remove();
    });



    questionField.appendChild(questionStatement);
    questionField.appendChild(questionType);
    questionField.appendChild(btnAddOption);
    questionField.appendChild(btnRemoveQuest);

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