const deleteForm = document.querySelector('.actions');

deleteForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formId = document.querySelector('#form-title').dataset.id;
    console.log(formId);
    const url = `/magicforms/formulario/${formId}/delete`;

    axios.delete(url)
    .then(res => {
        console.log(res.data);
        window.location.href = '/magicforms';
    })
    .catch(err => {
        console.error(err);
        alert('Ocorreu um erro ao deletar o formulário');
    })
});