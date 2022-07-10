class RecipeCard {
    constructor(Recipe) {
        this.Recipe = Recipe
        this.$container = document.querySelector('.main-container')
        this.$wrapper = document.createElement('article')
        this.$wrapper.classList.add('card')
    }

    createRecipeCard() {

        const recipeCard = `
            <div class="card-img-container">
            </div>
            <div class="card-body pd">
                <div class="card-heading flex">
                    <h3 class="card-title">${this.Recipe.name}</h3>
                    <div class="card-time"><i class="fas fa-clock"></i> <span class="recipe-duration">${this.Recipe.time}</span> min</div>
                </div>
                <div class="card-content flex">
                        <ul class="card-list">
                            
                        </ul>
                    <div class="card-description">
                        <p>${this.Recipe.description}</p>
                    </div>
                </div>
            </div>
        `

        this.$wrapper.innerHTML = recipeCard

        this.Recipe.ingredients.forEach(ingredient => {

            const item = `<li><strong class="list-item">${ingredient.ingredient}</strong>: ${ingredient.quantity ? ingredient.quantity : ""}${ingredient.unit ? ingredient.unit === "grammes" ? "g" : ingredient.unit : ""}</li>`

            this.$wrapper.querySelector('.card-list').innerHTML += item
        })
        

        this.$container.appendChild(this.$wrapper)
    }
}