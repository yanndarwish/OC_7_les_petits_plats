class App {
    constructor(){
        this.$search = document.querySelector('#searchbar')
    }

    main() {
        const mainFilter = new Filter()
        mainFilter.applyFilter()
        mainFilter.updateTags()
        
        this.$search.addEventListener('keyup', e => {
            let Input = e.target.value
            if (Input.length > 2) {
                mainFilter.applyFilter(Input.toLowerCase())
            } else if (Input.length === 0) {
                console.log('nulle')
                mainFilter.applyFilter()
            }
        })
    }

}

const app = new App()
app.main()