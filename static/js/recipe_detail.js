document.addEventListener('DOMContentLoaded', ()=> {
let path = window.location.pathname;//to get the id of recipe
let path_s = path.split("/");
let num = path_s[path_s.length - 2]
let recipe;

console.log(JSON.parse(localStorage.getItem('recipes')))
var data = JSON.parse(localStorage.getItem('recipes'));//finds recipe by id and recipe=recipes[id-1]
    for(let i=0;i<data.length; i++){
        if (data[i].id==num) {
            recipe=data[i];break;}
    }

const divRecipe = $('<div>').addClass('recipe');
const container = $('<div>').addClass('recipe');
let temp = recipe.ingredients.join(', ');

const recipeImage = $('<img>').attr('src', recipe.image);
const description = $('<p>').text("Description: "+recipe.description);
const instructions = $('<p>').text("Instructions: "+recipe.instructions);
const ingredients = $('<p>').text("Ingredients: "+temp);

container.append(description,instructions,ingredients);
divRecipe.append(recipeImage,container);
$('#recipe').append(divRecipe);




})
