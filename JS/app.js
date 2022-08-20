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

        this.$selectedTagsContainer = document.querySelector('.selected-tags-container')
        this.$filtersLists           = document.querySelectorAll('.filters-list')
        this.$tagSearchbars         = document.querySelectorAll('.tag-searchbar')
    }

    main() {
        // first render on load
        this.Tags.format(this.Recipes)
        Filter.displayRecipes(recipes)

        // if search from input
        this.$stringInput.addEventListener('keyup', () => {
            if (this.$stringInput.value.length > 2) {
                // update this.Recipes
                this.Recipes = PatternSearch.format(this.hasTags ? this.Recipes : recipes, this.$stringInput.value)
                // update tags based on updated recipes
                this.Tags.format(this.Recipes)
                // render DOM
                Filter.displayRecipes(this.Recipes)
                // this.Filter.filter(recipes, this.$stringInput.value)
            } else if (this.$stringInput.value.length === 0) {
                // update this.Recipes
                this.Recipes = this.Tags.format(recipes, this.selectedTags)
                // update tags based on updated recipes
                this.Tags.format(this.Recipes, this.selectedTags)
                // render DOM
                Filter.displayRecipes(this.Recipes)
            }
            // activate tags On click events
            addToSelectedTags()
            removeFromSelectedTags()
        })

        // tag searchbar
        this.$tagSearchbars.forEach(searchbar => {
            searchbar.addEventListener('keyup', e => {
                let value = e.target.value
                let category = e.target.getAttribute('data-category')
                // filter tags based on which one is clicked
                this.Tags.filterTagList(category, value)
                // reactivate Tags on click event because of rerender
                addToSelectedTags()
                removeFromSelectedTags()
            })
        })
        // add a Tag
        const addToSelectedTags = () => {
            document.querySelectorAll('.tag-item').forEach(tag => {
                tag.addEventListener('click', e => {
                    if (!this.selectedTags.includes(e.target.innerText.trim()) && e.target.nodeName === 'LI') {
                        // update element's class
                        e.target.classList.add('selected-tag')
                        e.target.classList.remove('tag-item')
                        // update selectedTags + status
                        this.selectedTags = this.Tags.addSelectedTag(e)
                        this.hasTags = true
                        // update this.Recipes
                        this.Recipes = this.Tags.format(this.Recipes, this.selectedTags)
                        // update tags based on updated recipes
                        this.Tags.format(this.Recipes, this.selectedTags)
                        // reactivate Tags on click event because of rerender
                        // render DOM
                        Filter.displayRecipes(this.Recipes)
                    }
                    addToSelectedTags()
                    removeFromSelectedTags()
                })
            })
        }
        // remove a tag
        const removeFromSelectedTags = () => {
            document.querySelectorAll('.selected-tag').forEach(tag => {
                tag.addEventListener('click', e => {
                    if (document.querySelectorAll('.selected-tag').length) {
                        // update selectedTags + status
                        if (e.target.nodeName === 'IMG') {
                            if (e.target.parentNode.parentNode) {
                                e.target.parentNode.parentNode.classList.remove('selected-tag')
                                e.target.parentNode.parentNode.classList.add('tag-item')
                                this.selectedTags = this.Tags.removeFromSelectedTags(e.target.parentNode.parentNode)
                            }
                            // update element's class
                        } else if (e.target.nodeName === 'DIV' ) {
                            if (e.target.parentNode) {
                                e.target.parentNode.classList.remove('selected-tag')
                                e.target.parentNode.classList.add('tag-item')
                                this.selectedTags = this.Tags.removeFromSelectedTags(e.target.parentNode)
                            }
                        } else {
                            if (this.selectedTags.includes(e.target.innerText.trim())) {
                                // update element's class
                            e.target.classList.remove('selected-tag')
                            e.target.classList.add('tag-item')
                                this.selectedTags = this.Tags.removeFromSelectedTags(e.target)
                            }
                        }
                        if (this.selectedTags.length === 0) {
                            this.hasTags = false
                        }
                        // update this.Recipes
                        this.Recipes = this.Tags.format(this.originalRecipes, this.selectedTags)
                        // if string input, update recipes based on the pattern search result
                        if (this.$stringInput.value.length > 2) {
                            this.Recipes = PatternSearch.format(this.hasTags ? this.Recipes : recipes, this.$stringInput.value)
                        }
                        // update tags based on updated recipes
                        this.Tags.format(this.Recipes, this.selectedTags)
                        // render DOM
                        Filter.displayRecipes(this.Recipes)
                    }
                    addToSelectedTags()
                })
            })
        }
        // activate Tags on click events
        addToSelectedTags()
        removeFromSelectedTags()
    }
}

const app = new App()
app.main()