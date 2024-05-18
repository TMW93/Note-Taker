const router = require('express').Router();

const notesRouteer = require(`./notes`);

router.use(`/notes`, notesRouteer);

module.exports = router;