let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let User = require('./models/user')
let database = require('./database')

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let authApi = require('./api/auth')
let registerApi = require('./api/register')
let userApi = require('./api/user')

app.use('/api/auth', authApi)
app.use('/api/register', registerApi)
app.use('/api/users', userApi)

// app.get('/', (req, res) => {
//     let user = new User({
//         username: 'tranphucbol',
//         password: '123456',
//         winningCount: 1,
//         gameCount: 2,
//         point: 1000
//     })

//     user.save()
//         .then(doc => {
//             res.json(doc)
//         })
//         .catch(err => {
//             res.json(err)
//         })
// })



app.set('port', process.env.PORT || 3001);

app.listen(app.get('port'), () => {
    console.log('server is  listening on port ' + app.get('port'));
});