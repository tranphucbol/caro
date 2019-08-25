let express = require('express')
let router = express.Router()
let roomService = require('../services/room')
let roomPollingService = require('../services/room-polling')
let passport = require('../middlewares/passport')

router.get('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    let rooms = await roomService.getAllRooms()
    let roomsFilter = rooms.filter(room => room.host !== req.user.username && room.guest === undefined)
    res.json(roomsFilter)
})

router.get('/polling', passport.authenticate('jwt', {session: false}), async (req, res) => {
    let rooms = await roomPollingService.getAllRooms()
    res.json(rooms)
})

module.exports = router