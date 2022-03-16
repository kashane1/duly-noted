const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
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

module.exports = notes;