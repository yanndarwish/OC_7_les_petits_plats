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
        this.TagObject = new Tags()

        this.$selectedTagsContainer = document.querySelector('.selected-tags-container')
        this.$tagItems
        this.$filtersList = document.querySelectorAll('.filters-list')
        this.$container = document.querySelector('.main-container')
    }

    initRecipes(Recipes) {
        this.Recipes = []
        this.OriginalRecipes = []

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
        if (arguments.length === 0) {
            this.displayFilteredRecipes(this.Recipes)

        // if Input 
        } else {
            this.TagObject.updateTagsArrays(this.Recipes, Input)

            this.clearContainer()
            // apply on this.recipes only when has Tags and no action
            if (this.hasTags && Action !== 'DEC') {
                Recipes = this.Recipes
            } 
            if (typeof Input !== 'string') {
                Input = Input[Input.length - 1]
            } else {
                this.Input = Input
                this.patternSearch(this.Input)
            }
            // if no tags and no input ( when you remove the last tag for example )
            // reset and display original Node with handleEmptyInput function
            if (this.hasTags === false && this.Input === ""){
                console.log('now')
                this.handleEmptyInput()
            // else launch filter process
            } else {
                let FilteredRecipes = []
    
                // loop through the recipes to find match
                for (let i = 0; i < Recipes.length; i++) {
                    let Keywords =  ""
                    // push ingredients in Keywords array
                    for (let j = 0; j < Recipes[i].ingredients.length; j++) {
                        Keywords += ` ${Recipes[i].ingredients[j].ingredient.toLowerCase()}`
                    }
                    // push appliances in Keywords array
                    Keywords += ` ${Recipes[i].appliance.toLowerCase()}`
                    // push ustensils in Keywords array
                    for (let j = 0; j < Recipes[i].ustensils.length; j++) {
                        Keywords += ` ${Recipes[i].ustensils[j].toLowerCase()}`
                    }
                    // if Input is found in keywords
                    if (this.search(Keywords, Input)) {
                        FilteredRecipes.push(Recipes[i])
                    }
                }
                this.Recipes = FilteredRecipes
    
                this.updateTagsArrays(FilteredRecipes, Input)
            }
        }    
    }

    patternSearch() {

    }
    // search algorithm
    search(txt, pat) {
        let M = pat.length;
        let N = txt.length;
        /* A loop to slide pattern one by one */
        for (let i = 0; i <= N - M; i++) {
            let j;
            /* For current index i, check for pattern match */
            for (j = 0; j < M; j++)
                if (txt[i + j] != pat[j])
                    break;
            // if pat[0...M-1] = txt[i, i+1, ...i+M-1]
            if (j == M) {
                return true
            }
        }
    }

    updateTagsArrays(Recipes, Input) {
        // reset tags
        this.Tags = []
        this.Ing = []
        this.App = []
        this.Ust = []    
        // loop through Recipes to update tags
        for (let i = 0; i < Recipes.length; i++) {
            for (let j = 0; j < Recipes[i].ingredients.length; j++) {
                // do not add the current input to the tag list (explaining the !==)
                if(Recipes[i].ingredients[j].ingredient.toLowerCase() !== Input) {
                    this.Ing.push(Recipes[i].ingredients[j].ingredient.toLowerCase())
                } 
            }
            if (Recipes[i].appliance.toLowerCase() !== Input) {
                this.App.push(Recipes[i].appliance.toLowerCase())
            }
            for (let j = 0; j < Recipes[i].ustensils.length; j++) {
                if(Recipes[i].ustensils[j].toLowerCase() !== Input) {
                    this.Ust.push(Recipes[i].ustensils[j].toLowerCase())
                } 
            }
        }
        this.displayFilteredRecipes(Recipes)
        this.removeDoubleTags()
        this.updateTags()
    }

    displayFilteredRecipes(Recipes) {
        if (Recipes.length === 0) {
            this.$container.innerHTML = "Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc."
        } else {
            Recipes.forEach(recipe => {
                const Template = new RecipeCard(recipe)
                Template.createRecipeCard()
            })
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

    updateTags() {
        this.clearTags()
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

        this.$tagItems = document.querySelectorAll('.tag-item')
        this.handleTags()
    }

    handleTags() {
        this.$tagItems.forEach(tagNode => {
            tagNode.addEventListener('click', e => {
                // if the tag was already selected, deselect it and put it back to dropdown menu
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
                    // after removing tag, if the selected tags are empty
                    // apply filter based on the eventual input
                    if (this.selectedTags.length === 0) {
                        this.hasTags = false
                        this.applyFilter(this.OriginalRecipes, this.Input)
                    // else apply filter based on remaining selected tags
                    } else {
                        this.applyFilter(this.OriginalRecipes, this.selectedTags, 'DEC')
                    }
                // else create an ul and put the tag inside 
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
        // if this.hastags is true, keep filtered array
        this.Input = ""
        if (this.hasTags) {
            this.applyFilter(this.OriginalRecipes, this.selectedTags, 'DEC')
        } else {
            this.initRecipes(this.OriginalRecipes)
            this.displayOriginalNode()
        }
        // else, display original one
    }
}