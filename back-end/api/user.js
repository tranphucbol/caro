let express = require('express')
let router = express.Router()
let UserService = require('../services/user')
let passport = require('../middlewares/passport')

let userService = new UserService()

router.get('/:username', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        let user = await userService.getUserByUsername(req.params.username)
        res.json({
            username: user.username,
            winningCount: user.winningCount,
            gameCount: user.gameCount,
            point: user.point
        })
    } catch (err) {
        console.log(err)
        res.status(err.code).json(err)
    }
})

module.exports = router