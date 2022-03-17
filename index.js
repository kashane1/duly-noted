const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;
const app = express();


// adding routes and middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
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
