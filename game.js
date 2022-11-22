import { Data } from "./data/data.js"
class TextAPI {

    constructor () {

        this.initialize.display.initStartDisplay()

        this.data = new Data();

    }

    initialize = {

        display: {

            initStartDisplay: () => {

                // Initialize Components
                let file = document.createElement("input")
                let start = document.createElement("button")

                // Edit Components
                file.type = "file"
                file.addEventListener("change", (e) => {

                    const READER = new FileReader()

                    READER.addEventListener("load", (e) => {

                        JSZip.loadAsync(READER.result).then((zip) => {

                            zip.file("game.json").async("string").then((data) => {

                                this.data.STORAGE.json = JSON.parse(data)

                            })

                            zip.file("game.js").async("string").then((data) => {

                                let script = document.createElement("script")

                                script.innerText = data

                                console.log(script);

                                document.body.appendChild(script)

                            })

                            this.data.STORAGE.zip = zip

                        })

                    })

                    READER.readAsArrayBuffer(e.target.files[0])

                })


                start.innerText = "Start Game"
                start.addEventListener("click", () => {

                    this.initialize.display.initGameDisplay()

                })

                // Apply Components

                document.body.appendChild(file)
                document.body.appendChild(start)


                
            },

            initGameDisplay: () => {

                // Initialize Components

                let body = document.createElement("div")


                let title = document.createElement("span")
                let description = document.createElement("span")

                // Edit Components

                body.classList.add("body")

                title.classList.add("body__title")
                description.classList.add("body__description")

                // Apply Components

                body.appendChild(title)
                body.appendChild(description)
                document.body.appendChild(body)
                

            }

        }

    }

}

export {TextAPI}
