const { Router } = require('express')

const router = Router()

const DeveloperControler = require('../controllers/developer-controler')
const devControler = new DeveloperControler()

router.get(DeveloperControler.rotas().home, devControler.home())
router.post(DeveloperControler.rotas().create,devControler.addDev())

router.get(DeveloperControler.rotas().searchNearby, devControler.searchNearby())


module.exports = router