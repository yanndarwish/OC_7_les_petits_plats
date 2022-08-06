class App {
    constructor(){
        // this.PatternSearch   = new PatternSearch()
        this.PatternSearch = new PatternSearch()
        this.tagsDom = new TagsDOM()
        this.Tags = new Tags(this.OriginalRecipes, this.tagsDom)
        this.OriginalRecipes = recipes

        this.$stringInput     = document.querySelector('#searchbar')
    }

    main() {
        // this.Tags = new Tags(this.OriginalRecipes)
        this.Filter = new Filter(this.PatternSearch, this.Tags)
        this.Filter.init(this.OriginalRecipes)

        this.Filter.displayRecipes(this.OriginalRecipes, this.Tags)

        this.$stringInput.addEventListener('keyup', () => {
            if (this.$stringInput.value.length > 2) {
                this.Filter.filter(this.OriginalRecipes, this.$stringInput.value)
            } else if (this.$stringInput.value.length === 0) {
                this.Filter.displayRecipes(this.OriginalRecipes)
            }
        })
    }

}

const app = new App()
app.main()