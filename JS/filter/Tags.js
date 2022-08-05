class Tags {
    constructor() {
        this.Ing                    = []
        this.App                    = []
        this.Ust                    = []
        this.selectedTags           = []
        this.hasTags                = false
        this.$tagItems

        this.$selectedTagsContainer = document.querySelector('.selected-tags-container')
        this.$filtersList           = document.querySelectorAll('.filters-list')
    }

    format(Recipes) {
        console.log(Recipes)
        Recipes.forEach(recipe => {
            // update this.Ing 
            recipe.ingredients.forEach(({ingredient}) => {
                this.Ing.push(ingredient.toLowerCase())
            })
            // update this.App
            this.App.push(recipe.appliance.toLowerCase())
            // update this.Ust
            recipe.ustensils.forEach((ustensil) => {
                this.Ust.push(ustensil.toLowerCase())
            })
        });
        this.removeDoubleTags()
    }

    removeDoubleTags() {
        this.Ing = [...new Set(this.Ing)]
        this.App = [...new Set(this.App)]
        this.Ust = [...new Set(this.Ust)]
        // this.Tags = this.Ing.concat(this.App, this.Ust)
    }
}