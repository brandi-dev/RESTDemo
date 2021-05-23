const { urlencoded } = require('express');
const express = require('express');
const app = express();
const path = require('path');

// parse urlencoded data
app.use(express.urlencoded({ extended: true}))
// parse json data
app.use(express.json())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const comments = [
    {
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    },
]

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
})

app.get('/tacos', (req, res) => {
    res.send("GET /tacos response")
})

app.post('/tacos', (req, res) => {
    const {meat, qty} = req.body;
    res.send(`OK here are your ${qty} ${meat} tacos`)
})

app.listen(3000, () => {
    console.log("ON PORT 3000!")
})

// pattern to follow (one way to implement RESTful APIs) 
// basic CRUD functionality blueprint
// GET     /comments - list all comments
// POST    /comments - create a new comments
// GET     /comments/:id - get one comment (using ID)
// PATCH   /comments/:id - update one comment
// DELETE  /comments/:id - delete one comment