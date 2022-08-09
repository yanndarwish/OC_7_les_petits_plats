class Filter {
    constructor(Recipes) {
    }

    static displayRecipes(Recipes) {
        document.querySelector('.main-container').innerHTML = ""

        if (Recipes.length === 0) {
            document.querySelector('.main-container').innerHTML = "Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc."
        } else {
            Recipes.forEach(recipe => {
                const Template = new RecipeCard(recipe)
                Template.createRecipeCard()
            })
        }
    }
}