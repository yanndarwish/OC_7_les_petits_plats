class Tags extends Filter{
    constructor(Recipes, TagsDom) {
        super(TagsDom)
        this.Recipes = Recipes
        this.Ing                    = []
        this.App                    = []
        this.Ust                    = []
        this.selectedTags           = []
        this.TagsInstance = this
        this.tagsDom = TagsDom


        this.$selectedTagsContainer = document.querySelector('.selected-tags-container')
        this.$filtersList           = document.querySelectorAll('.filters-list')
    }

    format(Recipes, Tags, TagsInstance) {
        this.Recipes = Recipes
        this.Ing = []
        this.App = []
        this.Ust = []

        Recipes.forEach(recipe => {
            // update this.Ing 
            recipe.ingredients.forEach(({ingredient}) => {
                this.Ing.push(ingredient.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, ""))
            })
            // update this.App
            this.App.push(recipe.appliance.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, ""))
            // update this.Ust
            recipe.ustensils.forEach((ustensil) => {
                this.Ust.push(ustensil.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, ""))
            })
        });
        // remove double tags
        this.Ing = [...new Set(this.Ing)]
        this.App = [...new Set(this.App)]
        this.Ust = [...new Set(this.Ust)]   

        this.filterByTags(Recipes, Tags)
        this.updateDOM(TagsInstance)
        return this.filterByTags(Recipes, Tags)
    }

    updateDOM(TagsInstance) {
        if (TagsInstance) {
            console.log(this.Recipes)
            TagsInstance.render(this.Recipes, this.Ing, this.App, this.Ust)
            TagsInstance.handleSearch()
            TagsInstance.handleClick()
        } else {
            this.tagsDom.render(this.Recipes, this.Ing, this.App, this.Ust)
            this.tagsDom.handleSearch()
            this.tagsDom.handleClick()
        }
    }

    filterByTags(Recipes, Tags) {
        console.log(Tags)
        // find matches in recipes based on tags 
        let filteredRecipes = []
        Recipes.forEach(recipe => {
            let keywords = []
            recipe.ingredients.forEach(({ingredient}) => {
                keywords.push(ingredient.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, ""))
            })
            keywords.push(recipe.appliance.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, ""))
            recipe.ustensils.forEach(ustensil => {
                keywords.push(ustensil.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, ""))
            })
            // remove doubles
            keywords = [...new Set(keywords)]
            let match = true
            if (Tags) {
                Tags.forEach(tag => {
                    if (keywords.indexOf(tag) === -1) {
                        match = false
                    }
                })
            }
            if (match === true) {
                filteredRecipes.push(recipe)
            }
        })
        this.Recipes = filteredRecipes
        console.log(filteredRecipes)
        return filteredRecipes
    }
}

// todo fix selected tag issue