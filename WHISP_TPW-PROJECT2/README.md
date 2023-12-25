# Projeto TPW2 (Rede Social)

## 1. Membros do Grupo

| NMec | Name | email | 
|:---: |:---|:---:|
| 108317 | Miguel Aido Miragaia          | [miguelmiragaia@ua.pt](https://github.com/Miragaia)      |
| 107323 | Vasco Miguel Fernandes Faria  | [vascomfaria@ua.pt](https://github.com/Vasco-Faria)      |
| 107634 | Rodrigo Martins Graça         | [rodrigomgraca@ua.pt](https://github.com/rodrigograc4)   |

## 2. Descrição do Projeto
**Introdução**
- Este é um projeto de desenvolvimento de uma rede social básica utilizando o Angular Framework e Django REST Framework. O objetivo principal é criar uma plataforma onde os users podem se registrar, criar posts, fazer upload de imagens e interagir uns com os outros de diversas formas.

**Objetivos**

| Objectives | Done |
|:---: |:---:|
| Development of a web application (client and server side), to allow the information access in an easy and intuitive way.| X |
| For the client side, it must be developed with Angular technology, to provide all needed user interfaces.| X |
| For server side, it must use Django REST Framework (DRF), to provide a set of REST Web Services, to provide all needed functionalities in back-end, to allow all kind of operations: data searching, insertion, updating, deleting and all subsequent validations| X |
| Development of an authentication system, using e.g. Django Rest Framework Authentication. | X |
| In order to be accessed from anywhere and use a real n-tier software architecture, the deployment can be done for the different application’s layers. The server side (DRF) can be deployed at pythonanywhere.com, as before for the Django application, and the client side at Heroku | X (except Heroku) |
| A small report describing the main fundamental parts implemented, and any other information needed to run the application, is necessary. | X |

## 3. Funcionalidades Atuais

- Registo e autenticação de Users (Django Rest Framework Authentication);
- Troca de password
- Criação e visualização de Posts (Upload de Texto, Video, Imagem)
- Página de Feed (Posts de todos os users)
- Perfil de User (username, Name, email, Biography, Date joined, Last Login Date, User posts)
- Personalização de informações e Imagem no Perfil
- Remover Post (Permitido ao admin, e ao user a quem o Post pertence)


## Test Accounts
- User
    ```
    User:
	- Username: srpadre
	- Password: amenamen
    ```

- Admin:
    ```
	- Username: admin
	- Password: olaolaola
    ```

## Deployment

- [Netlify](https://whisp.netlify.app)
- [PythonAnywhere](http://vascomfaria.pythonanywhere.com/admin/)

| ENDPOINT |	METHOD |	DESCRIPTION |
|:---: |:---:| :---: |
| posts/	| GET |	Retorna os posts de todos os users |
| posts/create/ |	POST |	Criação de um post |
| profile/user/<number:id>/ |	PUT |	Atualização de um perfil de um user por id. |
| profile/user/<number:id>/ |	GET |	Obtenção de um perfil de um user por id. |
| change-password/ |	PUT |	Troca de password de um user já existente. |
| user_info/<str:username>/ |	GET |	Obtenção de informação por username. |
| user_info/<str:username>/ |	PUT |	Atualização de informação por username. |
| rest-auth/login/ |	POST |	Login de user existente para obtenção do token de autenticação de user. |
| rest-auth/registration/ |	POST |	Registo de um novo user, fornece o token de autenticação de user. |
