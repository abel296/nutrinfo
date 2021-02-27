# project-3

## routes

| route | http verb | description |
| ------------- | ------------- | ------------- |
| /  | GET  | Home page  |
| /inicio-sesion  | GET  | Login page  |
| /inicio-sesion  | POST  | Login page, it sends user info to the database  |
| /registro  | GET  | Signup page  |
| /registro  | POST  | Signup page, it creates user into the database  |
| /perfil  | GET  | Profile page  |
| /perfil/editar  | GET  | Edit profile page  |
| /perfil/editar  | POST  | Edit profile page, it edits logged user profile info  |
| /perfil/prenda/crear  | GET  | New cloth form  |
| /perfil/prenda/crear  | POST  | New cloth form, creates a new cloth into the databaase  |
| /perfil/prenda/eliminar  | POST  | Removes a cloth from the database  |
| /:genero | GET  | Shows filtered cloths by genre  |
| /:genero/:tipo-de-ropa  | GET  | Shows by genre and clth type  |
| /:id  | GET  | Shows selected cloth  |
