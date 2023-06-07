class TextRPG {

    constructor() {

    }

    init = {

        initStart: () => {

            // Initialize start items for setting up the game.
            // File input
            let file = document.createElement("input")

            // Start button
            let start = document.createElement("button")

            // Edit Components
            // Set type
            file.type = "file"

            // Add event to file input
            file.addEventListener("change", (e) => {

                // Init a file reader
                const READER = new FileReader()

                // Set what happens when something is loaded with the reader
                READER.addEventListener("load", (e) => {

                    // Read the zip file and store it into a variable
                    JSZip.loadAsync(READER.result).then((zip) => {

                        // Put zip file into a variable
                        this.STORAGE.ZIP = zip
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
                this.init.initGame()

                // Remove the start components
                file.remove()
                start.remove()
            })

            // Add components to the start screen
            document.body.appendChild(file)
            document.body.appendChild(start)
        },

        initGame: () => {

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

            // Start scene
            var start_scene_id = null
            this.STORAGE.zip.file('game.json').async('string').then((data) => {
                var data = JSON.parse(data)
                var settings = data.game_data.root_settings

                this.STORAGE.zip.file(settings).async('string').then((data) => {
                    var settings_json = JSON.parse(data)
                    start_scene = settings_json.start_scene
                })
            })
            this.STORAGE.current_scene = this.game.scenes.getScene(start_scene_id)
        }
    }

    update = {

    }

    game = {
        scenes: {
            getScene: (scene_id) => {
                var scene_manager
                var scene = null
                this.STORAGE.zip.file('game.json').async('string').then((data) => {
                    var data = JSON.parse(data)
                    scene_manager = data.game_data.root_scene_control
                })
                this.STORAGE.zip.file(scene_manager).async('string').then((data) => {
                    scene_manager = JSON.parse(data)
                })
                for (var scene_temp in scene_manager.scenes) {
                    if (scene_temp.id == scene_id) {
                        scene = scene_temp
                    }
                }
                return scene
            }
        }
    }
}

export { TextRPG }