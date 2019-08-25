let express = require('express')
let router = express.Router()
let userService = require('../services/user')
let leaderBoardService = require('../services/rank')
let passport = require('../middlewares/passport')

router.get('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    let leaderBoard = await leaderBoardService.getTop100()
    let promises = leaderBoard.map(username => userService.getUserByUsername(username))
    let users = await Promise.all(promises)
    res.json(users)
})

module.exports = router