class PatternSearch {
    constructor() {
    }

    static format(Recipes, value) {
        // stringify the data to ease pattern search
        let FilteredRecipes = []
        Recipes.forEach(recipe => {
            let string = ''
            // add title to string
            string += ' ' + recipe.name.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")
            // add ingredients to string
            recipe.ingredients.forEach(ingredient => {
                string += ' ' + ingredient.ingredient.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")
            })
            // add decription to string
            string += ' ' + recipe.description.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")
            // compare the value with the new string to check for matches
            // if match, push in filteredRecipes
            if (PatternSearch.search(string, value)) {
                FilteredRecipes.push(recipe)
            }
        })
        // return the filtered array
        return FilteredRecipes
    }

    static search(string, value) {
        // A loop to slide pattern one by one 
        // substract lengths to provide big enough window to compare the two
        for (let i = 0; i <= string.length - value.length; i++) {
            let j;
            // For current index i, check for pattern match
            for (j = 0; j < value.length; j++)
                if (string[i + j] != value[j])
                    break;
            if (j == value.length) {
                return true
            }
        }
    }
} 