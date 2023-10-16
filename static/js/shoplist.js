document.addEventListener('DOMContentLoaded', ()=> {

        const recipes = JSON.parse(localStorage.getItem("all_recipes"));
        const s_list = JSON.parse(localStorage.getItem("shoplist"));

        console.log(recipes[1].title);//indexes of recipes
        console.log('aa')
        console.log(recipes);
        const ul = document.getElementById("list");
        const l = document.getElementById("test");
        for (var i = 0; i < s_list.length; i++){
            console.log(s_list.length)
//            const recipe = $('<img>').text('ddd');
//            $('#ul').append(recipe);
            l.innerHTML = recipes[1].title;
        }




})