class Filter {
    constructor() {
        this.Input = ""
        this.OriginalNode = ""
        this.Recipes = []
        this.Tags = []
        this.Ing = []
        this.App = []
        this.Ust = []

        this.$filtersList = document.querySelectorAll('.filters-list')
        this.$container = document.querySelector('.main-container')
    }

    applyFilter(Input, Tags) {
        this.$container.innerHTML = ""
        // if no arguments, display all the recipes
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
                    // create cards and render
                    const Template = new RecipeCard(recipe)
                    Template.createRecipeCard()
                })
            this.updateTags()
            // if Input form search bar 
        } else if (Input) {
            this.clearContainer()

            let regExp = new RegExp(Input)
            let filteredRecipes = []
            // define function to check if the recipe is already in filteredRecipes
            // and prevent doubles
            function containsObject(obj, list) {
                for (let i = 0; i < list.length; i++) {
                    if (list[i] === obj) {
                        return true
                    }
                }
                return false
            }
            // exctract keywords from each recipe and look for matches
            this.Recipes.forEach(recipe => {
                let Keywords = []
                // push ingredients in Keywords array
                recipe.ingredients.forEach(ingredient => {
                    Keywords.push(ingredient.ingredient.toLowerCase())
                })
                // push appliances in Keywords array
                Keywords.push(recipe.appliance.toLowerCase())
                // push ustensils in Keywords array
                recipe.ustensils.forEach(ustensil => {
                    Keywords.push(ustensil.toLowerCase())
                })
                // look for matches
                Keywords.forEach(word => {
                    // if match found
                    if (word.match(regExp)) {
                        // if recipe is not already in the array, push it !
                        if (!containsObject(recipe, filteredRecipes)) {
                            filteredRecipes.push(recipe)
                        }
                        
                    }
                })
            })

            // update this.Recipes
            this.Recipes = filteredRecipes
            // reset Tags
            this.Tags = []
            this.Ing = []
            this.App = []
            this.Ust = []

            this.Recipes
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
                    const Template = new RecipeCard(recipe)
                    Template.createRecipeCard()
                })
            this.updateTags()
        }

        this.removeDoubleTags()
    }

    displayOriginalNode() {
        this.$container.innerHTML =  this.OriginalNode
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

    clearContainer() {
        this.$container.innerHTML = ""
    }

    saveOriginalNode(Node) {
        // save all the recipes html nodes as strings to make loading quicker
        this.OriginalNode += Node.innerHTML
    }
}