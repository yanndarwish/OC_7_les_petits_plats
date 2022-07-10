class App {
    constructor(){
        this.$search = document.querySelector('#searchbar')
    }

    main() {
        const mainFilter = new Filter()
        mainFilter.applyFilter()
        mainFilter.updateTags()
    }
}

const app = new App()
app.main()