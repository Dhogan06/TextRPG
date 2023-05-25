class TextAPI {

    constructor () {

        this.initialize.display.initStartDisplay()
    }

    initialize = {

        display: {

            initStartDisplay: () => {

                // Initialize start items for setting up the game.
                // File input
                let file = document.createElement("input")

                // Start button
                let start = document.createElement("button")

                // Edit Components
                // Set type
                file.type = "file"
                
                // Set what happens when file is changed or uploaded
                file.addEventListener("change", (e) => {

                    // Init a file reader
                    const READER = new FileReader()
                    
                    // Set what happens when something is loaded with the reader
                    READER.addEventListener("load", (e) => {

                        // Read the zip file and store it into a variable
                        JSZip.loadAsync(READER.result).then((zip) => {

                            // get the main game file and put it into a variable
                            zip.file("game.json").async("string").then((data) => {

                                // Put into variable
                                this.data.STORAGE.json = JSON.parse(data)
                            })

                            // Putzip file into a variable
                            this.data.STORAGE.zip = zip
                        })
                    })

                    // Read the zip file that was uploaded
                    READER.readAsArrayBuffer(e.target.files[0])
                })

                // Set up the start button now
                // Set text
                start.innerText = "Start Game"

                // Set onclick event
                start.addEventListener("click", () => {

                    // Init the game
                    this.initialize.display.initGameDisplay()

                    // Remove the start components
                    file.remove()
                    start.remove()
                })

                // Add components to the start screen
                document.body.appendChild(file)
                document.body.appendChild(start)
            },

            initGameDisplay: () => {

                // Initialize components for the main game screen
                // Body div element
                let body = document.createElement("div")

                // Title
                let title = document.createElement("span")

                // Description
                let description = document.createElement("span")

                // Button group
                let buttonGroup = document.createElement("div")

                // Edit Components
                // Add class body to the body div element
                body.classList.add("body")

                // Add class body__title to the title element
                title.classList.add("body__title")

                // Add class body__descrition to the Description element
                description.classList.add("body__description")

                // Add call body__option_group to the button group element
                buttonGroup.classList.add("body__option_group")

                // Add components to the main game screen
                body.appendChild(title)
                body.appendChild(description)
                body.appendChild(buttonGroup)
                document.body.appendChild(body)

                // Add components to variables to access them later
                this.titleSpan = title
                this.descriptionSpan = description
                this.bodyDiv = body
                this.buttonGroup = buttonGroup

                // Initialize the game data and put it into variables
                
                this.data.STORAGE.zip.file(this.data.STORAGE.json.scenes[this.data.STORAGE.data.CURRENT_SCENE_ID].file).async("string").then(data => {

                    this.data.STORAGE.data.CURRENT_SCENE = JSON.parse(data)
                })

                // setTimeout(this.update.display.updateGameDisplay.bind(this), 100)
            }
        }
    }

    buttons = {

        optionBtn: (option) => {

            if (option != null) {

                option.conditions.forEach(condition => {

                    if (condition != null) {

                        switch (condition.type) {

                            default:
                                console.log("Invalid Condition Type");

                        }

                    }

                })

                option.events.forEach(event => {

                    if (event != null) {

                        switch (event.type) {

                            case "always_execute":
                                this.gameClass[event.execute.function](...event.execute.args)
                                break
                            default:
                                console.log("Invalid Event Type");

                        }

                    }

                })

                if (option.change_scene_to != null) {

                    this.update.scenes.changeCurrentScene(option.change_scene_to)

                }

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
                        button.classList.add("body__option_group__option")
                        button.id = "option"
                        button.addEventListener("click",this.buttons.optionBtn.bind(this, option))

                        this.buttonGroup.appendChild(button)

                    })

            }

        },

        scenes: {

            changeScene: (manager_id, scene_id) => {

            }
        }
    }

    data = {
        STORAGE: {

            zip: null,
            json: {},
            data: {}
    
        }
    }
}

export {TextAPI}