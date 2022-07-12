class Filter {
    constructor() {
        this.Input = ""
        this.OriginalNode = ""
        this.OriginalRecipes = []
        this.Recipes = []
        this.Tags = []
        this.Ing = []
        this.App = []
        this.Ust = []
        this.selectedTags = []
        this.hasTags = false

        this.$selectedTagsContainer = document.querySelector('.selected-tags-container')
        this.$tagItems
        this.$filtersList = document.querySelectorAll('.filters-list')
        this.$container = document.querySelector('.main-container')
    }

    initRecipes(Recipes) {
        this.Recipes = []
        // exctract data from recipes
        Recipes
            // .map(recipe => new Recipe(recipe))
            .forEach(recipe => {
                // get ingredients
                recipe.ingredients.forEach(ingredient => {
                    // this.Tags.push(ingredient.ingredient.toLowerCase())
                    this.Ing.push(ingredient.ingredient.toLowerCase())
                })
                // get appliances
                // this.Tags.push(recipe.appliance.toLowerCase())
                this.App.push(recipe.appliance.toLowerCase())
                // get ustensils
                recipe.ustensils.forEach(ustensil => {
                    // this.Tags.push(ustensil.toLowerCase())
                    this.Ust.push(ustensil.toLowerCase())
                })
                // push in this.Recipes
                this.Recipes.push(recipe)
                this.OriginalRecipes.push(recipe)
            }) 
            this.removeDoubleTags()
            this.updateTags()
    }

    applyFilter(Recipes, Input, Action) {
        this.$container.innerHTML = ""
        // if no arguments, display all the recipes
        if (!Input) {
            this.Recipes
                .forEach(recipe => {
                    // create cards and render
                    const Template = new RecipeCard(recipe)
                    Template.createRecipeCard()
                })

        // if Input from search bar 
        } else {
            this.clearContainer()
            // if Input is a tag, get the last one
            if (this.hasTags && Action !== 'DEC') {
                Recipes = this.Recipes
            }
            if (typeof Input !== 'string') {
                Input = Input[Input.length - 1]
            }

            let regExp = new RegExp(Input)
            let filteredRecipes = []
            // function to check if the recipe is already in filteredRecipes
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
            Recipes.forEach(recipe => {
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

            // update Tags and create cards for each recipe
            this.Recipes
                .map(recipe => new Recipe(recipe))
                .forEach(recipe => {
                    // get ingredients
                    recipe.ingredients.forEach(ingredient => {
                        // this.Tags.push(ingredient.ingredient.toLowerCase())
                        if (ingredient.ingredient.toLowerCase() !== Input) {
                            this.Ing.push(ingredient.ingredient.toLowerCase())
                        }
                    })
                    // get appliances
                    // this.Tags.push(recipe.appliance.toLowerCase())
                    if (recipe.appliance.toLowerCase() !== Input) {
                        this.App.push(recipe.appliance.toLowerCase())
                    }
                    // get ustensils
                    recipe.ustensils.forEach(ustensil => {
                        // this.Tags.push(ustensil.toLowerCase())
                        if (ustensil.toLowerCase() !== Input) {
                            this.Ust.push(ustensil.toLowerCase())
                        }
                    })
                    // push recipe in this.Recipes array
                    const Template = new RecipeCard(recipe)
                    Template.createRecipeCard()
                })
                this.removeDoubleTags()
                this.updateTags()
        }
    }

    displayOriginalNode() {
        this.$container.innerHTML =  this.OriginalNode
    }

    removeDoubleTags() {
        this.Ing = [...new Set(this.Ing)]
        this.App = [...new Set(this.App)]
        this.Ust = [...new Set(this.Ust)]
        this.Tags = this.Ing.concat(this.App, this.Ust)
    }

    updateTags(Tags) {
        this.clearTags()
        if (!Tags) {
            // display ingredients tag in dropdown list
            this.Ing.forEach(ing => {
                const item = `
                <li class="tag-item ing">${ing}</li>
                `
                this.$filtersList[0].innerHTML += item
            })
            // display appliances tag in dropdown list
            this.App.forEach(app => {
                const item = `
                <li class="tag-item app">${app}</li>
                `
                this.$filtersList[1].innerHTML += item
            })
            // display ustensils tag in dropdown list
            this.Ust.forEach(ust => {
                const item = `
                <li class="tag-item ust">${ust}</li>
                `
                this.$filtersList[2].innerHTML += item
            })
        }

        this.$tagItems = document.querySelectorAll('.tag-item')
        this.handleTags()
    }

    handleTags() {
        this.$tagItems.forEach(tagNode => {
            tagNode.addEventListener('click', e => {
                if(tagNode.classList.contains('selected-tag')) {
                    this.selectedTags = this.selectedTags.filter(elt => elt !== tagNode.innerHTML)
                    if(tagNode.classList.contains('ing')) {
                        tagNode.classList.remove('selected-tag')
                        tagNode.classList.add('tag-item')
                        this.$filtersList[0].appendChild(tagNode)
                    }
                    else if(tagNode.classList.contains('app')) {
                        tagNode.classList.remove('selected-tag')
                        tagNode.classList.add('tag-item')
                        this.$filtersList[1].appendChild(tagNode)
                    }
                    else if(tagNode.classList.contains('ust')) {
                        tagNode.classList.remove('selected-tag')
                        tagNode.classList.add('tag-item')
                        this.$filtersList[2].appendChild(tagNode)
                    }
                    this.applyFilter(this.OriginalRecipes, this.selectedTags, 'DEC')
                } else {
                    let selectedTags = document.querySelectorAll('.selected-tag')
                    this.selectedTags.push(tagNode.innerHTML)
    
                    tagNode.classList.remove('tag-item')
                    tagNode.classList.add('selected-tag')
    
                    // if no tags selected, create new ul
                    if (selectedTags.length === 0) {
                        let wrapper = document.createElement('ul')
                        wrapper.classList.add('selected-tag-list', 'flex')
                        this.$selectedTagsContainer.appendChild(wrapper)
                    }
                    // insert tag in ul
                    document.querySelector('.selected-tag-list').appendChild(e.target)
                    this.hasTags = true
                    // apply filter with selected tag
                    this.applyFilter(this.Recipes, this.selectedTags)
                }
            })
        })
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

    handleEmptyInput() {
        // check if this.hastags === true 
        // if true, keep filtered array
        if (this.hasTags) {
            this.applyFilter(this.OriginalRecipes, this.selectedTags, 'DEC')
        } else {
            this.initRecipes(this.OriginalRecipes)
            this.displayOriginalNode()
        }
        // else, display original one
    }
}