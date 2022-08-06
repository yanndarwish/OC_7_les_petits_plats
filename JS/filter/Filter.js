// todo this file must get the input and send it to the proper function (patternsearch or tag search)
// todo and should serve as a dispatcher

// should get the user input as input (text or tag)
// and return to the proper function as output

class  Filter {
    constructor(PatternSearch, Tags) {
        this.PatternSearch = PatternSearch
        this.Tags          = Tags 
        this.Recipes       =  []
        this.OriginalRecipes = []

        this.$container    = document.querySelector('.main-container')
    }

    init(Recipes) {
        this.Recipes = Recipes
        this.OriginalRecipes = Recipes
        // this.PatternSearch = new PatternSearch()
        // this.Tags = new Tags(this.Recipes)
        this.Tags.format(this.Recipes)
    }

    filter(Recipes, input, TagsInstance, option) {
        // value is a string, send to patternSearch
        if (typeof input === 'string') {
            console.log(this.Recipes)
            this.Recipes = this.PatternSearch.format(Recipes, input)
            console.log(this.Recipes)

            this.displayRecipes(this.Recipes)

        } else if (typeof input === 'object'){
                // this.Tags = new Tags(Recipes)
                // option === 'back' 
                //     ? TagsInstance.filterByTags(this.OriginalRecipes, input)
                //     : TagsInstance.filterByTags(this.Recipes, input)
                this.displayRecipes(TagsInstance.format(this.Recipes, input, TagsInstance), TagsInstance)
        } else {
            throw 'invalid type of input';
        }
    } 

    displayRecipes(Recipes, TagsInstance) {
        console.log(Recipes)
        this.Recipes = Recipes

        this.$container.innerHTML = ""

        if (Recipes.length === 0) {
            this.$container.innerHTML = "Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc."
        } else {
            Recipes.forEach(recipe => {
                const Template = new RecipeCard(recipe)
                Template.createRecipeCard()
            })
        }
        // update tags
        if (TagsInstance) {
            // console.log('instance')
            TagsInstance.format(Recipes, [], TagsInstance) 
        } else {
            this.Tags.format(Recipes)
        }
    }
}