class Game {
    constructor () {
    }
    killPlayer = function() {

        API.module.update.scenes.changeCurrentScene(API.module.data.STORAGE.json.settings.start_scene)

    }
    giveItem = function(data, amount) {

        for (const i=0;i<amount;i++) {
        
            API.module.data.STORAGE.data.INV.push(data)

        }

    }

}