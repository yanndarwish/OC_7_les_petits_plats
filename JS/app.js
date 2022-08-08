class App {
    constructor(){
        this.$stringInput     = document.querySelector('#searchbar')
        this.Filter = new Filter(recipes)
        this.Tags = new Tags()
        this.PatternSearch = new PatternSearch()
        this.hasTags         = false
        this.originalRecipes = recipes
        this.Recipes = recipes
        this.selectedTags           = []
        this.Ing = []
        this.App = []
        this.Ust = []
        // this.originalIng            = []
        // this.originalApp            = []
        // this.originalUst            = []

        this.$selectedTagsContainer = document.querySelector('.selected-tags-container')
        this.$filtersLists           = document.querySelectorAll('.filters-list')
        this.$tagSearchbars         = document.querySelectorAll('.tag-searchbar')
    }
    // todo, try to create all instances here, and build all the logic from here
    main() {
        this.Tags.format(this.Recipes)
        Filter.displayRecipes(recipes)

        // if search from input
        this.$stringInput.addEventListener('keyup', () => {
            this.Recipes = this.PatternSearch.format(this.hasTags ? this.Recipes : recipes, this.$stringInput.value)
            if (this.$stringInput.value.length > 2) {
                this.Tags.format(this.Recipes)
                Filter.displayRecipes(this.Recipes)
                // this.Filter.filter(recipes, this.$stringInput.value)
            } else if (this.$stringInput.value.length === 0) {
                this.Tags.format(this.Recipes)
                Filter.displayRecipes(this.Recipes)
            }
            addToSelectedTags()
            removeFromSelectedTags()
        })

        // tag searchbar
        this.$tagSearchbars.forEach(searchbar => {
            searchbar.addEventListener('keyup', e => {
                console.log(this.Recipes)
                let value = e.target.value
                let category = e.target.getAttribute('data-category')
                console.log(category)
                console.log(value)
                this.Tags.filterTagList(category, value)
                addToSelectedTags()
                removeFromSelectedTags()
            })
        })
        // if filter by tags
        const addToSelectedTags = () => {
            document.querySelectorAll('.tag-item').forEach(tag => {
                tag.addEventListener('click', e => {
                    if (!this.selectedTags.includes(e.target.innerHTML)) {
                        e.target.classList.add('selected-tag')
                        e.target.classList.remove('tag-item')
    
                        this.selectedTags = this.Tags.addSelectedTag(e)
                        this.hasTags = true
                        this.Recipes = this.Tags.format(this.Recipes, this.selectedTags)
                        this.Tags.format(this.Recipes, this.selectedTags)

                        let value = e.target.innerHTML

                        addToSelectedTags()
                        removeFromSelectedTags()
                        Filter.displayRecipes(this.Recipes)
                    }
                })
            })
        }

        const removeFromSelectedTags = () => {
            document.querySelectorAll('.selected-tag').forEach(tag => {
                tag.addEventListener('click', e => {
                    if (document.querySelectorAll('.selected-tag').length ) {
                        e.target.classList.remove('selected-tag')
                        e.target.classList.add('tag-item')

                        this.selectedTags = this.Tags.removeFromSelectedTags(e)
                        this.Recipes = this.Tags.format(this.originalRecipes, this.selectedTags)
                        if (this.$stringInput.value.length > 2) {
                            this.Recipes = this.PatternSearch.format(this.hasTags ? this.Recipes : recipes, this.$stringInput.value)
                        }
                
                        if (this.selectedTags.length === 0) {
                            this.hasTags = false
                        }
                        Filter.displayRecipes(this.Recipes)
                    }
                    addToSelectedTags()

                })
            })
        }
        addToSelectedTags()
        removeFromSelectedTags()
    }
}

const app = new App()
app.main()