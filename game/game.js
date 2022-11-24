class Game {
    constructor () {
    }
    killPlayer = function() {

        API.module.update.scenes.changeCurrentScene(API.module.data.STORAGE.json.settings.start_scene)

    }
    giveItem = function(data, amount) {

        for (var i=0;i<amount;i++) {

            if (API.module.data.STORAGE.data.INV == null) API.module.data.STORAGE.data.INV = []
            API.module.data.STORAGE.data.INV.push(data)
            
        }

        console.log(API.module.data.STORAGE.data.INV);

    }

}