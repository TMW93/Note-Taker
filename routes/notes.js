const notes = require(`express`).Router();
const {readAndAppend, readFromFile} = require(`../helpers/fsUtils`);
const uuid = require(`../helpers/uuid`);

//Get Route for getting saved notes
notes.get(`/`, (req, res) => {
  readFromFile(`./db/db.json`)
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
    readAndAppend(newNote, `./db/db.json`);

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

module.exports = notes;