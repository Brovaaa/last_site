document.addEventListener('DOMContentLoaded', () => {
    const perPage = 2; // Number of recipes to display per page
    let allRecipes = [];

    // Fetch all recipes from Django
    fetch(`/test-features/`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            allRecipes =data;
            console.log(JSON.stringify(allRecipes));
            localStorage.setItem("data",JSON.stringify(allRecipes));
            loadRecipes(1); // Load the first page of recipes
        })
        .catch(error => {
            console.error('Error:', error);
        });

    function sortRecipesByIdDesc() {
        allRecipes.sort((a, b) => b.id - a.id); // Sort recipes by ID in descending order
    }

    function loadRecipes(page) {
        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;
        const recipes_to_display = allRecipes.slice(startIndex, endIndex);
        displayItems(recipes_to_display);
        renderPaginationControls()


    }


    function displayItems(recipes_to_display) {//add fetch for new page
             let recipes = recipes_to_display;

              const recipe_container = document.getElementById('recipe-container');
              recipe_container.innerHTML = ''; // Clear previous items

              console.log("r:",recipes);


                for (var i = 0; i < recipes.length; i++) {
                    let recipe = recipes[i];
                    console.log('image:'+recipe.image);
                    // Create a div to hold the entire recipe content
                    const recipeDiv = $('<div>').addClass('recipe');

                    const titleContainer = $('<div>').addClass('title-container');
                    const title = $('<h2>').text(recipe.title);
                    const link = $('<a>').attr('href', `/recipe_detail/${recipe.id}/`).addClass('text-link');;
                    link.append(title);

                    const contentContainer = $('<div>').addClass('content-container');
                    const recipeImage = $('<img>').attr('src', recipe.image);

                    const textContainer = $('<div>').addClass('text-container');
                    const description = $('<p>').text(recipe.description);

                    // Append elements to their respective containers
                    titleContainer.append(link);
                    textContainer.append(description);
                    contentContainer.append(recipeImage, textContainer);

                    // Append the title container and content container to the recipe div
                    recipeDiv.append(titleContainer)
                    recipeDiv.append(contentContainer);

                    // Append the recipe div to the #recipe-container in your HTML
                    $('#recipe-container').append(recipeDiv);
                }

            }

        function renderPaginationControls() {//need to create a fetch to get length of Recipes to create buttons

              let recipes = JSON.parse(localStorage.getItem('data'));
              let recipes_len = recipes.length;
              const totalPages = Math.ceil(recipes_len / 2);//need to change this r
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

    // Event listener for sorting by ID in descending order
    const sortByIdDesc = document.getElementById('sort-title');
    sortByIdDesc.addEventListener('click', function() {
        sortRecipesByIdDesc(); // Sort all recipes by ID in descending order
        loadRecipes(1); // Reload the first page with sorted recipes
    });

});


