# RESTful API Specification

## Auth API

> POST: /api/auth

```javascript
//Request
{
    username: 'user123',
    password: 'password'
}

//Response Success
//Response Code: 200
{
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
}

//Response Error
//Response Code: 400
{
    error: {
        message: 'Wrong username or password'
    }
}
```

## Register API

> POST: /api/register

```javascript
//Request
{
    username: 'user123',
    password: 'password',
    re_password: 'password'
}

//Response Successful
//Response Code: 200
{
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
}

//Response Error
//Response Code 400

//Error User Existed
{
    error: 'Username existed'
}

//Error re-password doesn't match password
{
    error: 'Re-password doesn\'t match password'
}
```

## Get All Room API

> GET: /api/rooms

```javascript
//Request
//Header

{
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
}

//Response Successful
{
    [
        {
            host: 'user123',
            bet: 10000,
            name: 'Come on, Come on!!!'
        },
        {
            host: 'user345',
            bet: 0,
            name: 'Hey Boy!!!'
        }
    ]
}

//Response Error
//Response Code: 401
{
    error: 'You must login first'
}
```

## Ranking 100 User API

> GET: /api/rankings

```javascript
//Resquest
{
    [
        {
            username: 'user123',
            avatar: 'http://localhost/images/user.jpg',
            rate: '58.8%',
            point: '120000'
        },
        ...
    ]
}
```

## Ranking of User API

> GET: /api/rankings/:user_id

```javascript
{
    username: 'user123',
    rank: 100
}
```

## Get User Info API

> GET: /api/users/:user_id

```javascript
//Response
{

    username: 'user123',
    avatar: 'http://localhost/images/user.jpg',
    rate: '50%',
    point: '120000',
    countWinning: 100,
    countGame: 200
}
```