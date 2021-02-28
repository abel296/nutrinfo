# project-3

## routes

| route | http verb | description |
| ------------- | ------------- | ------------- |
| /auth/signup  | POST  | Creates a user into the database  |
| /auth/login  | POST  | Log in a user  |
| /auth/logout  | POST  | Log out a user  |
| /auth/loggedin  | GET  | Checks if a user is logged in and returns it  |
| /recipes/getAllRecipes  | GET  | Returns all recipes in the database  |
| /recipes/getOneRecipe/:id  | GET  | Return a recipe from the database  |
| /recipes/getRecipesByUser/:id  | GET  | Returns all recipes from a user  |
| /recipes/createNewRecipe  | POST  | Creates recipe into the database |
| /recipes/editRecipe/:id  | PUT  | Edits a recipe from the database  |
| /recipes/deleteRecipe  | DELETE  | Removes a recipe from the database  |


