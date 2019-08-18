let express = require('express')
let router = express.Router()
let UserService = require('../services/user')

let userService = new UserService()

router.post('/', async (req, res) => {
    try {
        let token = await userService.auth(req.body.username, req.body.password)
        res.json(token)
    } catch (err) {
        res.status(err.code).json(err)
    }
})

module.exports = router