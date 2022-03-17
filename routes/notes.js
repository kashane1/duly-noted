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

notes.delete('/:id', (req, res) => {
    const idDeleteObj = req.params;
    const idDelete = idDeleteObj.id;
    console.log(idDelete);

    if (idDelete === -1) return res.error('Error in deleting note');

    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => {
        let inNotesData = JSON.parse(data)
        console.log(inNotesData);

        let indexDelete = inNotesData.findIndex(inNotesData.id == idDelete);
        console.log(indexDelete);
        inNotesData.splice(indexDelete,1),

        // removeNote(id) {
        //     // Get all notes, remove the note with the given id, write the filtered notes
        //     return this.getNotes()
        //       .then(notes => notes.filter(note => note.id !== parseInt(id)))
        //       .then(filteredNotes => this.write(filteredNotes));
        //   }

        
        console.log(inNotesData);

        writeToFile('./db/db.json', inNotesData);
    });


    res.json(`Note deleted successfully 🚀`);
})

module.exports = notes;