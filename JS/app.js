class App {
    constructor(){
        this.$search = document.querySelector('#searchbar')
    }

    main() {
        const mainFilter = new Filter()
        mainFilter.applyFilter()
        mainFilter.updateTags()
        mainFilter.saveOriginalNode(document.querySelector('.main-container'))
        
        this.$search.addEventListener('keyup', e => {
            let Input = e.target.value
            if (Input.length > 2) {
                mainFilter.applyFilter(Input.toLowerCase())
                // if input empty display all the recipes
            } else if (Input.length === 0) {
                mainFilter.displayOriginalNode()
            }
        })
    }

}

const app = new App()
app.main()