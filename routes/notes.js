const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helper/fsUtils');
const { v4: uuidv4 } = require('uuid')

// GET Route for retrieving all notes
notes.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST route for new notes
notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add note`);
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        note_id: uuidv4(), 
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully`);
    } else {
      res.error('Error in adding note');
    }
  });
  
  module.exports = notes;
  