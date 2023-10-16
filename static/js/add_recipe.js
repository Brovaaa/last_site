
document.addEventListener('DOMContentLoaded', function() {
//    console.log("add recipe loaded!!!");
//    window.alert("ok?");
    const header = document.getElementById('header');
    header.innerHTML = 'Add Recipe';
    header.style.color = 'red';
    const recipe_title = document.getElementById("title");
    recipe_title.style.backgroundColor = "lightgreen";
    recipe_title.focus();



});
