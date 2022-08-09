// todo this file must get the input and send it to the proper function (patternsearch or tag search)
// todo and should serve as a dispatcher

// should get the user input as input (text or tag)
// and return to the proper function as output

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