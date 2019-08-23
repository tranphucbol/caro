let express = require('express')
let router = express.Router()
let userService = require('../services/user')
let roomService = require('../services/room')
let passport = require('../middlewares/passport')

router.get('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    let rooms = await roomService.getAllRooms()
    let roomsFilter = rooms.filter(room => room.host !== req.user.username && room.guest === undefined)
    res.json(roomsFilter)
})

module.exports = router