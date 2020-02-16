const { Router } = require('express')

const router = Router()

const DeveloperControler = require('../controllers/developer-controler')
const devControler = new DeveloperControler()
const devRotas = DeveloperControler.rotas()

router.get(devRotas.home, devControler.home())
router.post(devRotas.create,devControler.addDev())

router.get(devRotas.searchNearby, devControler.searchNearby())
router.delete(devRotas.remove, devControler.removeDev())

module.exports = router