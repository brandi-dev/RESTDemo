const { urlencoded } = require('express');
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const { v4: uuid } = require('uuid');

// parse urlencoded data
app.use(express.urlencoded({ extended: true}));
// parse json data
app.use(express.json());
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: uuid(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id: uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    },
]

// Index, path = /comments, GET request, Display all comments
app.get('/comments', (req, res) => {
    // { comments } gives me access to comments in the index.ejs
    res.render('comments/index', { comments });
});

// New, path = /comments/new, GET request, Form to create new comment
app.get('/comments/new', (req, res) => {
    res.render('comments/new');
});

// Create, path = /comments, POST request, Creates new comment on server
app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() }); 
    // after new comment is submitted takes you to the comments page
    res.redirect('/comments');
});

// Show, path = /comments/:id, GET request, Details for one specific comment
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment });
});

// Edit, path = /comments/:id/edit, GET request, Form to edit specific comment
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment })
})

// Update, path = /comments/:id, PATCH request, Updates specific comment on server
app.patch('/comments/:id', (req, res) => {
    //taking the id from the URL
    const { id } = req.params;
    //taking whatever was sent in the request.body.comments (payload)
    const newCommentText = req.body.comment;
    //finding comment with that id
    const foundComment = comments.find(c => c.id === id);
    //update the comment property to be whatever was in the req.body.comment
    foundComment.comment = newCommentText; 
    res.redirect('/comments')
})

// Destroy, path = /comments/:id, DELETE request, Deletes specific item on server
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    // returns a new array
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})

app.get('/tacos', (req, res) => {
    res.send("GET /tacos response")
});

app.post('/tacos', (req, res) => {
    const {meat, qty} = req.body;
    res.send(`OK here are your ${qty} ${meat} tacos`)
});

app.listen(3000, () => {
    console.log("ON PORT 3000!")
});

// pattern to follow (one way to implement RESTful APIs) 
// basic CRUD functionality blueprint
// GET     /comments - list all comments
// POST    /comments - create a new comments
// GET     /comments/:id - get one comment (using ID)
// PATCH   /comments/:id - update one comment
// DELETE  /comments/:id - delete one comment