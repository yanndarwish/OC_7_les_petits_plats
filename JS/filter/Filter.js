// todo this file must get the input and send it to the proper function (patternsearch or tag search)
// todo and should serve as a dispatcher

// should get the user input as input (text or tag)
// and return to the proper function as output

class Filter {
    constructor(Recipes) {
        // this.Recipes         =  Recipes
        // this.OriginalRecipes = Recipes
        // this.hasTags         = false
        // this.$container      = document.querySelector('.main-container')
    }

    // filter(Recipes, input, option) {
    //     // this.Tags = new Tags()
    //     // this.PatternSearch = new PatternSearch()
    //     // value is a string, send to patternSearch
    //     if (typeof input === 'string') {
    //         console.log(this.hasTags)
    //         this.Recipes = this.PatternSearch.format(this.hasTags ? this.Recipes : Recipes, input)
    //         console.log(this.Recipes)

    //         this.displayRecipes(this.Recipes)

    //     } else if (typeof input === 'object'){
    //         console.log('from Tags')
    //         input.length > 0 ? this.hasTags = true : this.hasTags = false
    //         console.log(this.hasTags)
    //             // this.Tags = new Tags(Recipes)
    //             // option === 'back' 
    //             //     ? .filterByTags(this.OriginalRecipes, input)
    //             //     : .filterByTags(this.Recipes, input)
    //             this.Recipes = this.Tags.format(this.Recipes, input)
    //             this.displayRecipes(this.Recipes)

    //     } else {
    //         // this.Tags.format(this.Recipes)
    //     }
    // } 

    static displayRecipes(Recipes) {
        // this.Recipes = Recipes

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