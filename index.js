const express = require('express');
const path = require('path');
const api = require('./routes/index.js');
const notes = require('./notes/index.js');

const PORT = process.env.PORT || 3001;
const app = express();

// starting with some of my notes and thoughts

// the GET /notes can be in this index.js file
// as well as GET *

// then API routes will be written in the /routes/ folder that i created
// adding routes
app.use('/api', api);

// copied this code to work with from lesson22 solved:
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes.html
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// this will show the PORT the website is on
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
