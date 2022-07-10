class App {
    constructor(){
        this.$search = document.querySelector('#searchbar')
    }

    main() {
        recipes
            .map(recipe => new Recipe(recipe))
            .forEach(recipe => {
                const Template = new RecipeCard(recipe)
                Template.createRecipeCard()
            })
    }
}

const app = new App()
app.main()