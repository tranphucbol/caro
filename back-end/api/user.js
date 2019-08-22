let express = require('express')
let router = express.Router()
let userService = require('../services/user')
let passport = require('../middlewares/passport')
let UserDTO = require('../dto/user-dto')

router.get('/:username', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        let user = await userService.getUserByUsername(req.params.username)
        res.json(new UserDTO(user))
    } catch (err) {
        console.log(err)
        res.status(err.code).json(err)
    }
})

module.exports = router