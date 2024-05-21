const notes = require(`express`).Router();
const {readAndAppend, readFromFile, writeToFile} = require(`../helpers/fsUtils`);
const uuid = require(`../helpers/uuid`);
const notesData = require(`../db/db.json`);

const notesDB = `./db/db.json`;

//Get Route for getting saved notes
notes.get(`/`, (req, res) => {
  readFromFile(notesDB)
  .then((data) => {
    res.json(JSON.parse(data));
  })
});

//Post Route for posting notes
notes.post(`/`, (req, res) => {
  //destructuring req.body
  const {title, text} = req.body;

  //checking if title and text exist
  if(title && text) {

    const newNote = {
      title: title,
      text: text,
      id: uuid(),
    };

    //append req.body onto notes api
    readAndAppend(newNote, notesDB);

    const response = {
      status: `Note posted successfully.`,
      body: newNote,
    };

    //post successful add to console
    res.json(response);

  } else {
    //if post was unsuccessful
    res.json(`Error in posting note.`)
  }

});

//Delete Route for deleting notes
notes.delete(`/:id`, (req, res) => {
  // console.log(notesData.length);

  let foundNote = [];
  const reqID = req.params.id;

  //finding requested note
  for(let i = 0; i < notesData.length; i++) {
    if(reqID === notesData[i].id) {
      foundNote = notesData[i];
    }
  }

  //filtering out the note by its id and returning new json object
  const filteredNotes = notesData.filter(function(note) {
    return note.id !== reqID;
  });

  // console.log(filteredNotes);

  writeToFile(notesDB, filteredNotes);

  if(foundNote) {
    const response = {
      status: `Note deleted successfully.`,
      body: foundNote,
    };

    res.json(response);
  } else {
    res.json(`Error in deleting note.`)
  }

});

module.exports = notes;