document.addEventListener('DOMContentLoaded', ()=> {

   console.log('logged in');
   const logout = document.getElementById("logout");
   const recipes = document.getElementById("text");
   const request = document.getElementById("request");
   const recipe_list = document.getElementById("recipe-list");

   logout.addEventListener("click", ()=>{ window.location.href= "/start/" } );

   request.addEventListener("click", ()=>{

       var xhr = new XMLHttpRequest();
       xhr.open("GET", "static/sample.txt?v="+ new Date().getTime(), true);//1)type=get/post  2)file/url  3)async

       xhr.onload = function() {
           if(this.status == 200){ text.textContent = xhr.responseText }// (xhr. or this.)responseText to print text in console
           else if(this.status == 404){ text.textContent = "Not found" };
       }
//       xhr.onprogress = function() {
//           console.log("server is processing request...");
//       }
       xhr.onerror = function(){
           console.log("Request error...");
       }
       xhr.send();
    });
                                    //RECIPE-LIST ON HOMEPAGE
        // Initialize the current page and items per page

    let currentPage = 1;
    let itemsPerPage = 3;
    // Function to load recipes for the specified page
    function loadRecipes(page) {
        $.ajax({
            url: `/api/recipes/?page=${page}`,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                let recipe_list = "";

                for (var i in data.results) {
                    let recipe = data.results[i];

                    recipe_list += '<ul>' +
                        '<li>ID: ' + recipe.id + '</li>' +
                        '<li>Title: ' + recipe.title + '</li>' +
                        //'<li>Ingredients: ' + recipe.ingredients.join(', ') + '</li>' + // Assuming ingredients is an array
                        //'<li>Image: <img src="' + recipe.image_url + '" alt="' + recipe.title + ' Image" /></li>' +
                        '</ul>';
                }
                document.getElementById('recipe-list').innerHTML += recipe_list;

                // Check if there are more pages to load
                if (data.next) {
                    currentPage++;
                    // Enable scrolling for the next page
                    enableScroll();
                } else {
                    // Disable scrolling when all pages are loaded
                    disableScroll();
                }
            },
            error: function (xhr, status, error) {
                console.error('Error!!! fetching recipes:', error);
                console.log(xhr);
            }
        });
    }

    // Function to enable scrolling
    function enableScroll() {
        // Detect when the user has scrolled to the bottom
        $(window).scroll(function () {
            if ($(window).scrollTop() + $(window).height() >= $(document).height() - 100) {
                // Load more recipes when the user is near the bottom
                loadRecipes(currentPage);
            }
        });
    }

    // Function to disable scrolling
    function disableScroll() {
        $(window).off('scroll'); // Remove the scroll event listener
    }

    // Initial load of recipes when the page loads
    loadRecipes(currentPage);




});