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

    const { title, text} = req.body;

    // this builds the request into an object and adds it to the db
    if (req.body) {
        const newNote = {
        title,
        text,
        id: uuid(),
        };

        // readAndAppend is borrowed from fsutils
        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully 🚀`);
    } else {
        res.error('Error in adding note');
    }
});

// adding a DELETE route to delete notes
notes.delete('/:id', (req, res) => {
    console.info(`${req.method} request received for notes`)

    const noteId = req.params.id;
    
    // i struggled here for over an hour, because i thought the readfromfile returned an object, but it doesnt.
    readFromFile('./db/db.json').then((data) => {
        // needed to parse the data first, into an array of objects
        const allNotes = JSON.parse(data);
        const newAllNotes = allNotes.filter(note => note.id != noteId);

        writeToFile("./db/db.json", newAllNotes);
    });

    res.json(`Note deleted successfully 🚀`);
})

module.exports = notes;