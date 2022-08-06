class TagsDOM extends Tags{
    constructor(ing, app, ust, TagsInstance) {
        super(TagsInstance)
        this.originalIng = ing
        this.originalApp = app
        this.originalUst = ust
        this.ing = ing
        this.app = app
        this.ust = ust
        this.selectedTags = []

        this.$filtersLists = document.querySelectorAll('.filters-list')
        this.$tagSearchbars = document.querySelectorAll('.tag-searchbar')
        this.$selectedTagsContainer = document.querySelector('.selected-tags-container')
    }

    render(Recipes, ing, app, ust) {
        this.Recipes = Recipes
        this.ing = ing
        this.app = app
        this.ust = ust

        this.$filtersLists.forEach(list => {
            list.innerHTML = ""
        })

        this.ing.forEach(ing => {
            const nodeString = `<li class="tag-item ing">${ing}</li>`
            this.$filtersLists[0].innerHTML += nodeString
        });
        this.app.forEach(app => {
            const nodeString = `<li class="tag-item app">${app}</li>`
            this.$filtersLists[1].innerHTML += nodeString
        });
        this.ust.forEach(ust => {
            const nodeString = `<li class="tag-item ust">${ust}</li>`
            this.$filtersLists[2].innerHTML += nodeString
        });
    }

    handleSearch() {
        this.$tagSearchbars.forEach(searchbar => {
            searchbar.addEventListener('keyup', e => {
                let value = e.target.value
                let category = e.target.getAttribute('data-category')

                switch (category) {
                    case 'ing':
                        // filter out the selected tag if necessary
                        this.ing = this.originalIng.filter(elt => !(this.selectedTags.indexOf(elt) > -1 )).filter(elt => elt.includes(value))
                        break
                    case 'app':
                        this.app = this.originalApp.filter(elt => !(this.selectedTags.indexOf(elt) > -1 )).filter(elt => elt.includes(value))
                        break
                    case 'ust':
                        this.ust = this.originalUst.filter(elt => !(this.selectedTags.indexOf(elt) > -1 )).filter(elt => elt.includes(value))
                        break
                }
                this.render()
                this.handleClick()
            })
        })
    }

    handleClick() {
        console.log(this.TagsInstance)
        document.querySelectorAll('.tag-item').forEach(tag => {
            tag.addEventListener('click', e => {
                if (e.target.classList.contains('selected-tag')) {
                    console.log(e.target)
                    e.target.classList.remove('selected-tag')
                    console.log(e.target)

                    if (e.target.classList.contains('ing')) {
                        this.$filtersLists[0].appendChild(e.target)
                    } else if (e.target.classList.contains('app')) {
                        this.$filtersLists[1].appendChild(e.target)
                    } else if (e.target.classList.contains('ust')) {
                        this.$filtersLists[2].appendChild(e.target)
                    }
                    // remove from selectedTags
                    this.selectedTags = this.selectedTags.filter(elt => elt !== e.target.innerHTML)
                    this.filter(this.Recipes, this.selectedTags, this.TagsInstance, 'back')

                } else {
                    e.target.classList.add('selected-tag')
                    this.$selectedTagsContainer.appendChild(e.target)

                    this.selectedTags.push(e.target.innerHTML)
                    console.log(this.selectedTags)
                    console.log(this.TagsInstance)
                    console.log(this.Recipes)
                    this.filter(this.Recipes, this.selectedTags, this.TagsInstance, 'none')
                }
            })
        })
    }
}

// todo handle filter by selected tags

// selected tags
