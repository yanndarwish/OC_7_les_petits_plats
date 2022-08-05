class App {
    constructor(){
        this.PatternSearch   = new PatternSearch()
        this.Tags            = new Tags()
        this.Filter          = new Filter(this.PatternSearch, this.Tags)
        this.OriginalRecipes = recipes

        this.stringInput     = document.querySelector('#searchbar')
    }

    main() {
        this.Tags.format(this.OriginalRecipes)
        this.Filter.displayRecipes(this.OriginalRecipes)

        this.stringInput.addEventListener('keyup', () => {
            if (this.stringInput.value.length > 2) {
                this.Filter.filter(this.OriginalRecipes, this.stringInput.value)
            } else if (this.stringInput.value.length === 0) {
                this.Filter.displayRecipes(this.OriginalRecipes)
            }
        })
    }

}

const app = new App()
app.main()