
                                                      //safe version
document.addEventListener('DOMContentLoaded', ()=> {



    //ajax request to get data from Django API
    function loadRecipes(page){
    // To retrieve HTML
    fetch(`/test-features/?html=true&page=${page}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Handle the HTML response as needed
        return response.text(); // You can use response.text() to access the HTML content
    })
    .then(htmlData => {
        //console.log(htmlData);
        console.log("curr page: "+ page);
    })
    .catch(error => {
        console.error('Error:', error);
    });




    // To retrieve JSON
    fetch(`/test-features/?page=${page}`) // to display specific page
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
//        const recipesJsonString = data.recipes; // Get the JSON string
//        const recipes = JSON.parse(recipesJsonString); // Parse the JSON string to an array
//        console.log(recipes);
//        localStorage.setItem('recipes', JSON.stringify(recipes));//caching data to use in other pages
        console.log(JSON.parse(localStorage.getItem('all_recipes')))
        displayItems(data.page_number);
        renderPaginationControls(data.list_len);
    })
    .catch(error => {
        console.error('Error:', error);
    });

    }


//    implementing pagination logic
      function displayItems(page) {//add fetch for new page
      console.log("PAGE IS: "+page)
      console.log(JSON.parse(localStorage.getItem('all_recipes')));
      let recipes = JSON.parse(localStorage.getItem('all_recipes'));
      const recipe_container = document.getElementById('recipe-container');
      recipe_container.innerHTML = ''; // Clear previous items




        for (var i = (page-1)*2; i < page*2; i++) {//2 should be changed to per-page
            let recipe = recipes[i];

            // Create a div to hold the entire recipe content
            const recipeDiv = $('<div>').addClass('recipe').attr("id",i+1);

            const titleContainer = $('<div>').addClass('title-container');
            const title = $('<h2>').text(recipe.title);
            titleContainer.append(title);
            titleContainer.on('click', function() {
                window.location.href = `/recipe_detail/${recipe.id}/`; });



            const contentContainer = $('<div>').addClass('content-container');
            const buttonContainer = $('<div>').addClass('button-container');
            const plus_btn = $('<button>').text("+").attr('id',"plus");
            const minus_btn = $('<button>').text("-").attr("id","minus");
            const recipeImage = $('<img>').attr('src', recipe.image);

            const textContainer = $('<div>').addClass('text-container');
            const description = $('<p>').text(recipe.description);

            // Append elements to their respective containers

            textContainer.append(description);
            buttonContainer.append(minus_btn, plus_btn);
            const holder = $('<div>').addClass('holder');
            holder.append(buttonContainer, textContainer);
            contentContainer.append(recipeImage, holder);

            recipeDiv.append(titleContainer)
            recipeDiv.append(contentContainer);

            // Append the recipe div to the #recipe-container in your HTML
            $('#recipe-container').append(recipeDiv);
        }

    }

    function renderPaginationControls(recipes_len) {//need to create a fetch to get length of Recipes to create buttons

      const totalPages = Math.ceil(recipes_len / 2);//2 per page
      const paginationControls = document.getElementById('pagination-controls');
      paginationControls.innerHTML = '';

      for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.addEventListener('click', () => {
          let currentPage = i;
          loadRecipes(currentPage);
        });
        paginationControls.appendChild(button);
      }
    }

loadRecipes(1);



//          SORTING FUNCTIONALITY
const sortByIDButton = document.getElementById('sort-id');
sortByIDButton.addEventListener('click', function() {
    get_data();
    let recipes = JSON.parse(localStorage.getItem("all_recipes"));
    recipes.sort((a, b) => b.id - a.id);
    //console.log(recipes);
    localStorage.setItem("all_recipes", JSON.stringify(recipes));
    loadRecipes(1);

});

function get_data() {
    fetch("/all-recipes/") // Fetch all data without pagination
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('all_recipes', JSON.stringify(data)); // Store the data in localStorage
        })
        .catch(error => {
            console.error('Error:', error);
        });
        }







//          SHOPLIST
let shoplist = []

const recipesContainer = document.getElementById('recipe-container');
recipesContainer.addEventListener('click', function(event) {

    if(event.target.tagName === 'BUTTON' && event.target.id === 'plus') {

        const recipeElement = event.target.closest('.recipe');

        const recipeID = recipeElement.getAttribute("id");
        shoplist.push(recipeID);
        //console.log('Clicked plus button for Recipe with id:', recipeID);
        displayShopList()
    }
    else if(event.target.tagName === 'BUTTON' && event.target.id === 'minus') {

        const recipeElement = event.target.closest('.recipe');

        const recipeID = recipeElement.getAttribute("id");
        let index = shoplist.indexOf(recipeID);
        if(index !== -1){
        shoplist.splice(index, 1);//remove 1 element starting from this index
        }
        displayShopList()
    }
});

function displayShopList(){
    const all_recipes = JSON.parse(localStorage.getItem('all_recipes'));
    console.log(shoplist);

    const divRecipe = $('<div>').addClass('recipe');
    $('#shoplist').empty();

    for (let i = 0; i < shoplist.length; i++) {
        let recipe = all_recipes[shoplist[i]-1];

        console.log(recipe);
        let temp = recipe.ingredients.join(', ');

        const recipeImage = $('<img>').attr('src', recipe.image);
        const ingredients = $('<p>').text("Ingredients: "+temp);
        //const look = $('button').addClass('detail-shoplist').text("Look through");

        divRecipe.append(recipeImage,ingredients);

        $('#shoplist').append(divRecipe);
    }
};


//shoplist submit
const submit_list = document.getElementById('submit-list');

submit_list.addEventListener('click', function(){//idk why but it doesn't work when the shoplist is empty, but it is helpful cause i only need submit when it is not empty
console.log("shoplist");
    localStorage.setItem('shoplist',JSON.stringify(shoplist));
    window.location.href = '/shoplist/';
});



});

