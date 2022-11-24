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

                                script.innerHTML = data

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

                this.gameClass = eval("new " + this.data.STORAGE.json.settings.game_class)

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

                // Add Components to Variables

                this.titleSpan = title
                this.descriptionSpan = description
                this.bodyDiv = body

                // Initialize Data Variables

                this.data.STORAGE.data.CURRENT_SCENE_ID = this.data.STORAGE.json.settings.start_scene
                
                this.data.STORAGE.zip.file(this.data.STORAGE.json.scenes[this.data.STORAGE.data.CURRENT_SCENE_ID].file).async("string").then(data => {

                    this.data.STORAGE.data.CURRENT_SCENE = JSON.parse(data)

                })
                
                

                // Stats

                this.data.STORAGE.json.settings.stats.forEach(stat => {

                    this.data.STORAGE.data.stats = []
                    
                    this.data.STORAGE.data.stats.push(stat)

                });

                setInterval(this.update.display.updateGameDisplay, 10)

            }

        }

    }

    update = {

        display: {

            updateGameDisplay: () => {

                    let optionsBtns = document.querySelectorAll("#option")

                    optionsBtns.forEach(option => {

                        option.remove()

                    })

                    this.titleSpan.innerText = this.data.STORAGE.data.CURRENT_SCENE.scene_name

                    this.descriptionSpan.innerText = this.data.STORAGE.data.CURRENT_SCENE.scene_description

                    this.data.STORAGE.data.CURRENT_SCENE.options.forEach(option => {

                        let button = document.createElement("button")

                        button.innerText = option.description
                        button.id = "option"
                        button.addEventListener("click", () => {

                            this.update.scenes.changeCurrentScene(option.change_scene_to)

                        })

                        this.bodyDiv.appendChild(button)

                    })

            }

        },

        scenes: {

            changeCurrentScene: (scene_id) => {

                this.data.STORAGE.data.CURRENT_SCENE_ID = scene_id

                this.data.STORAGE.zip.file(this.data.STORAGE.json.scenes[scene_id].file).async("string").then(data => {

                    this.data.STORAGE.data.CURRENT_SCENE = JSON.parse(data)

                    this.update.display.updateGameDisplay()

                })

            }

        }

    }

}

export {TextAPI}