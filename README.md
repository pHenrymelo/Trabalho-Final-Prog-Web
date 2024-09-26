# Trabalho-Final-Programação-Web - MagicForms 📜
sistema de criação de formulários online, como um Google Forms, e que o usuário poderá criar ou editar um formulário, desenvolvido como trabalho final da disciplina de Programação Web

## Requerimentos

- Python 3

## Configurando o ambiente

Instale as dependências do Python com o seguinte comando:

    pip install -r requirements.txt


Configuração das Variáveis de Ambiente

- Crie um DB no PgAdmin com nome 'MagicForms'
- Configuração usando um arquivo .env:

Crie um arquivo chamado .env na raiz do seu projeto e adicione as seguintes variáveis de ambiente:

    USER={usuario_do_banco_de_dados}
    PASSWORD={senha_do_banco_de_dados}
    HOST={endereco_do_banco_de_dados}
    PORT={porta_do_banco_de_dados}

  Substitua os valores entre chaves pelos valores correspondentes do seu ambiente.

## Uso

Ative o ambiente virtual (caso esteja utilizando):

    path\to\venv\Scripts\activate      # Windows

- rode o projeto com o comando "Flask run" ou "Python app.py" 
