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

// notes.delete('/:id', isAuth, (req,res) => {
//     const { id } = req.params;
    
//     Post.findOneAndDelete({
//         _id: id, 
//         $or: [{author: req.user._id}, {profile: req.user.username}]
//     })
//     .exec((err, post) => {
//         if(err)
//         return res.status(500).json({code: 500, message: 'There was an error deleting the post', error: err})
//         res.status(200).json({code: 200, message: 'Post deleted', deletedPost: post})
//     });
// })

notes.delete('/:id', (req, res) => {
    const id = req.params;
    
    if (id === -1) return res.error('Error in deleting note');

    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => {
        let inNotesData = JSON.parse(data)
        console.log(inNotesData);

        let outNotesData = inNotesData.map(notes => {
            if ()
        })
        // could use this to create new array:
        // let carsProperties = cars.map(car => {
        //     let properties = {
        //       "capacity": car.capacity,
        //       "size": "large"
        //     };
        //     if (car.capacity <= 5){
        //       properties['size'] = "medium";
        //     }
        //     if (car.capacity <= 3){
        //       properties['size'] = "small";
        //     }
        //     return properties;
        //    });
        //    console.log(carsProperties);
        //    // output:
        //    // [
        //    //   { capacity: 7, size: 'large' },
        //    //   { capacity: 5, size: 'medium' },
        //    //   { capacity: 5, size: 'medium' },
        //    //   { capacity: 2, size: 'small' },
        //    //   ...
        //    // ]



        writeToFile(allNotes, './db/db.json');
    });
    // will need this to delete?
    // Array.splice(
    //     {index where to start},
    //     {how many items to remove},
    //     {items to add}
    //   );


    res.json(`Note deleted successfully 🚀`);

    // start here with delete

    // writeToFile = (destination, content) =>
    // fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    //   err ? console.error(err) : console.info(`\nData written to ${destination}`)
    // );
})

module.exports = notes;