class Game {
    constructor () {
    }
    killPlayer = function() {

        API.module.update.scenes.changeCurrentScene(API.module.data.STORAGE.json.settings.start_scene)

    }

}