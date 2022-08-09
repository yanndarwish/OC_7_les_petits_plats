class Tags {
    constructor(Recipes) {
        this.originalRecipes = Recipes
        this.Recipes = Recipes
        this.Ing                    = []
        this.App                    = []
        this.Ust                    = []
        this.selectedTags           = []
        this.originalIng            = []
        this.originalApp            = []
        this.originalUst            = []
        this.hasTags = false

        this.$stringInput     = document.querySelector('#searchbar')
        this.$selectedTagsContainer = document.querySelector('.selected-tags-container')
        this.$filtersLists           = document.querySelectorAll('.filters-list')
        this.$tagSearchbars         = document.querySelectorAll('.tag-searchbar')

    }
    // format Tags
    format(Recipes, Tags) {
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
        console.log(Tags)
        // remove selected Tag
        if (Tags) {
            Tags.forEach(tag => {
                this.Ing = this.Ing.filter(elt => elt !== tag)
                this.App = this.App.filter(elt => elt !== tag)
                this.Ust = this.Ust.filter(elt => elt !== tag)
            })
        }

        this.originalIng = this.Ing
        this.originalApp = this.App
        this.originalUst = this.Ust 

        this.render()
        return this.filterByTags(Recipes, Tags)
    }
    // filter Recipes by tags and return filtered array
    filterByTags(Recipes, Tags) {
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
        return filteredRecipes
    }
    // render tag lists
    render() {
        this.$filtersLists.forEach(list => {
            list.innerHTML = ""
        })

        this.Ing.forEach(ing => {
            const nodeString = `<li class="tag-item ing" data-category="ing">${ing}</li>`
            this.$filtersLists[0].innerHTML += nodeString
        });
        this.App.forEach(app => {
            const nodeString = `<li class="tag-item app" data-category="app">${app}</li>`
            this.$filtersLists[1].innerHTML += nodeString
        });
        this.Ust.forEach(ust => {
            const nodeString = `<li class="tag-item ust" data-category="ust">${ust}</li>`
            this.$filtersLists[2].innerHTML += nodeString
        });
    }
    // filter tagLists on internal search 
    filterTagList(category, value) {
        switch (category) {
            case 'ing':
                // filter out the selected tag if necessary
                this.Ing = this.originalIng.filter(elt => !(this.selectedTags.indexOf(elt) > -1 )).filter(elt => elt.includes(value))
                break
                case 'app':
                    this.App = this.originalApp.filter(elt => !(this.selectedTags.indexOf(elt) > -1 )).filter(elt => elt.includes(value))
                    break
                    case 'ust':
                        this.Ust = this.originalUst.filter(elt => !(this.selectedTags.indexOf(elt) > -1 )).filter(elt => elt.includes(value))
                        break
                    }
                    console.log(this.selectedTags)
        this.render()
    }
    // add selected Tag
    addSelectedTag(e) {
        this.$selectedTagsContainer.appendChild(e.target)
        this.selectedTags.push(e.target.innerHTML)
        return this.selectedTags
    }
    // remove from selectedTags
    removeFromSelectedTags(e) {
        if (e.target.classList.contains('ing')) {
            this.$filtersLists[0].appendChild(e.target)
        } else if (e.target.classList.contains('app')) {
            this.$filtersLists[1].appendChild(e.target)
        } else if (e.target.classList.contains('ust')) {
            this.$filtersLists[2].appendChild(e.target)
        }
        this.selectedTags = this.selectedTags.filter(elt => elt !== e.target.innerHTML)

        return this.selectedTags
    }
}
