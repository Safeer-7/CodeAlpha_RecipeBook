let recipes = [];

    function addOrUpdateRecipe() {
      const recipeName = document.getElementById("recipeName").value;
      const ingredients = document.getElementById("ingredients").value;
      const methods = document.getElementById("methods").value;

      if (recipeName && ingredients && methods) {
        const existingRecipeIndex = recipes.findIndex(recipe => recipe.name === recipeName);

        if (existingRecipeIndex !== -1) {
          // Update existing recipe
          recipes[existingRecipeIndex].ingredients = ingredients;
          recipes[existingRecipeIndex].methods = methods;
        } else {
          // Add new recipe
          recipes.push({ name: recipeName, ingredients: ingredients, methods: methods });
        }

        saveRecipes();
        displayRecipes();
        clearForm();
      } else {
        alert("Please enter recipe name, ingredients, and methods.");
      }
    }

    function deleteRecipe(index) {
      recipes.splice(index, 1);
      saveRecipes();
      displayRecipes();
    }

    function displayRecipes(filteredRecipes) {
      const recipesContainer = document.getElementById("recipes");
      recipesContainer.innerHTML = "";

      (filteredRecipes || recipes).forEach((recipe, index) => {
        const recipeItem = document.createElement("div");
        recipeItem.className = "recipe-item";
        recipeItem.innerHTML = `<div class="recipe-details">
                                  <div>
                                    <label>Name:</label> <strong>${recipe.name}</strong><br>
                                    <label>Ingredients:</label> ${recipe.ingredients}<br>
                                    <label>Methods:</label> ${recipe.methods}
                                  </div>
                                  <div class="recipe-actions">
                                    <button onclick="deleteRecipe(${index})">Delete</button>
                                    <button onclick="editRecipe(${index})">Edit</button>
                                  </div>
                                </div>`;
        recipesContainer.appendChild(recipeItem);
      });
    }

    function editRecipe(index) {
      const recipe = recipes[index];
      document.getElementById("recipeName").value = recipe.name;
      document.getElementById("ingredients").value = recipe.ingredients;
      document.getElementById("methods").value = recipe.methods;
    }

    function clearForm() {
      document.getElementById("recipeName").value = "";
      document.getElementById("ingredients").value = "";
      document.getElementById("methods").value = "";
    }

    function searchRecipe() {
      const searchQuery = document.getElementById("search").value.toLowerCase();
      const filteredRecipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(searchQuery));
      displayRecipes(filteredRecipes);
    }

    function saveRecipes() {
      localStorage.setItem("recipes", JSON.stringify(recipes));
    }

    function loadRecipes() {
      const savedRecipes = localStorage.getItem("recipes");
      recipes = savedRecipes ? JSON.parse(savedRecipes) : [];
    }

    // Initial display
    loadRecipes();
    displayRecipes();