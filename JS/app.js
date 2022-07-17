class App {
    constructor(){
        this.$search = document.querySelector('#searchbar')
    }

    main() {
        const mainFilter = new Filter()
        mainFilter.initRecipes(recipes)
        mainFilter.applyFilter()

        mainFilter.saveOriginalNode(document.querySelector('.main-container'))
        
        this.$search.addEventListener('keyup', e => {
            let Input = e.target.value

            if (Input.length > 2  ) {
                mainFilter.applyFilter(recipes, Input.toLowerCase())
                // if input empty display all the recipes
            } else if (Input.length === 0) {
                mainFilter.handleEmptyInput()
            }
        })
    }

}

const app = new App()
app.main()