// todo search from input pattern
class PatternSearch {
    constructor() {
    }

    static format(Recipes, value) {
        // stringify the data to ease pattern search
        let FilteredRecipes = []
        Recipes.forEach(recipe => {
            let string = ''
            // add title to string
            string += recipe.name.toLowerCase()
            // add ingredients to string
            recipe.ingredients.forEach(ingredient => {
                string += ' ' + ingredient.ingredient.toLowerCase()
            })
            // add decription to string
            string += recipe.description.toLowerCase()
            // compare the value with the new string to check for matches
            // if match, push in filteredRecipes
            if (PatternSearch.search(string, value)) {
                FilteredRecipes.push(recipe)
            }
        })
        console.log(FilteredRecipes)

        // return the filtered array
        return FilteredRecipes
    }

    static search(string, value) {
        let M = value.length;
        let N = string.length;
        /* A loop to slide pattern one by one */
        for (let i = 0; i <= N - M; i++) {
            let j;
            /* For current index i, check for pattern match */
            for (j = 0; j < M; j++)
                if (string[i + j] != value[j])
                    break;
            // if pat[0...M-1] = txt[i, i+1, ...i+M-1]
            if (j == M) {
                return true
            }
        }
    }
} 

// ! NOMINAL CASE
// * search begins when 3ch are types, then fuzzy finder (on change) DONE

// * search in title, ingredients, description DONE

// * DOM is updated with search results DONE

// * Tags are updated based on search results  DONE

// ! ALTERNATIVE CASE 1
// * No macth : Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc.  DONE

// ! ALTERNATIVE CASE 2
// * Search begins with Tag DONE

// * DOM is updated with search results  DONE

// * Tags are updated based on search results   DONE

// ! ALTERNATIVE CASE 3
// * User adds tags  DONE

// * DOM is updated with search results  DONE

// * Tags are updated based on search results  DONE