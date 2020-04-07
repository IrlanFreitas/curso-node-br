const Routes = require('./base/routes')

class HeroRoutes extends Routes {
    constructor(db) {
        super()
        this.db = db
    }

    list () {
        return {
            path: '/herois',
            method: 'GET',
            handler: (resquest, response) => {
                return this.db.read()
            }
        }
    }
}

module.exports = HeroRoutes