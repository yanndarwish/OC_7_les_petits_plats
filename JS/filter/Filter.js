// todo this file must get the input and send it to the proper function (patternsearch or tag search)
// todo and should serve as a dispatcher

// should get the user input as input (text or tag)
// and return to the proper function as output

class  Filter {
    constructor(PatternSearch, Tags) {
        this.PatternSearch = PatternSearch
        this.Tags          = Tags
        this.Recipes       =  []

        this.$container    = document.querySelector('.main-container')
    }

    filter(Recipes, input) {
        // value is a string, send to patternSearch
        if (typeof input === 'string') {
            this.Recipes = this.PatternSearch.format(Recipes, input)
            // should return an array of filtered recipes
            this.displayRecipes(this.Recipes)
        } else if (typeof input === 'array'){
            // value is a tag (array), send to TagSearch
            console.log('now working with tag')
        } else {
            throw 'invalid type of input';
        }
    } 

    displayRecipes(Recipes) {
        this.$container.innerHTML = ""

        if (Recipes.length === 0) {
            this.$container.innerHTML = "Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc."
        } else {
            Recipes.forEach(recipe => {
                const Template = new RecipeCard(recipe)
                Template.createRecipeCard()
            })
        }
    }
}