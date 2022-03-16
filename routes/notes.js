const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET route for retrieving all the notes on page load
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST route for saving each new note into the db
notes.post('/', (req, res) => {
    console.info(`${req.method} request received for notes`)
    console.log(req.body);

    const { title, text} = req.body;

    if (req.body) {
        const newNote = {
        title,
        text,
        id: uuid(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully 🚀`);
    } else {
        res.error('Error in adding note');
    }
});

notes.delete('/:id', isAuth, (req,res) => {
    const { id } = req.params;
    
    Post.findOneAndDelete({
        _id: id, 
        $or: [{author: req.user._id}, {profile: req.user.username}]
    })
    .exec((err, post) => {
        if(err)
        return res.status(500).json({code: 500, message: 'There was an error deleting the post', error: err})
        res.status(200).json({code: 200, message: 'Post deleted', deletedPost: post})
    });
})

notes.delete('/:id', (req, res) => {
    const id = req.params;
    
    if (id === -1) return res.error('Error in deleting note');

    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
    

    // start here with delete

    // writeToFile = (destination, content) =>
    // fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    //   err ? console.error(err) : console.info(`\nData written to ${destination}`)
    // );
})

module.exports = notes;