class Filter {
    constructor() {
        this.Input = ""
        this.Recipes = []
        this.Tags = []
        this.Ing = []
        this.App = []
        this.Ust = []

        this.$filtersList = document.querySelectorAll('.filters-list')
    }

    applyFilter(Input, Tags) {
        if (!Input && !Tags) {
            recipes
                .map(recipe => new Recipe(recipe))
                .forEach(recipe => {
                    // get ingredients
                    recipe.ingredients.forEach(ingredient => {
                        this.Tags.push(ingredient.ingredient.toLowerCase())
                        this.Ing.push(ingredient.ingredient.toLowerCase())
                    })
                    // get appliances
                    this.Tags.push(recipe.appliance.toLowerCase())
                    this.App.push(recipe.appliance.toLowerCase())
                    // get ustensils
                    recipe.ustensils.forEach(ustensil => {
                        this.Tags.push(ustensil.toLowerCase())
                        this.Ust.push(ustensil.toLowerCase())
                    })
                    // push recipe in this.Recipes array
                    this.Recipes.push(recipe)
                    const Template = new RecipeCard(recipe)
                    Template.createRecipeCard()
                })
        }

        this.removeDoubleTags()
        this.updateTags()
    }

    removeDoubleTags() {
        this.Tags = [...new Set(this.Tags)]
        this.Ing = [...new Set(this.Ing)]
        this.App = [...new Set(this.App)]
        this.Ust = [...new Set(this.Ust)]
    }

    updateTags(Tags) {
        this.clearTags()
        if (!Tags) {
            // display ingredients tag in dropdown list
            this.Ing.forEach(ing => {
                const item = `
                <li class="tag-item">${ing}</li>
                `
                this.$filtersList[0].innerHTML += item
            })
            // display appliances tag in dropdown list
            this.App.forEach(app => {
                const item = `
                <li class="tag-item">${app}</li>
                `
                this.$filtersList[1].innerHTML += item
            })
            // display ustensils tag in dropdown list
            this.Ust.forEach(ust => {
                const item = `
                <li class="tag-item">${ust}</li>
                `
                this.$filtersList[2].innerHTML += item
            })
        }
    }

    clearTags() {
        this.$filtersList.forEach(list => {
            list.innerHTML = ""
        })
    }
}