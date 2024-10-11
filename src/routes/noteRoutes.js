const express = require('express')
const { getNotes, createNotes, updateNotes, deleteNotes} = require('../controllers/noteController')
const note = require('../models/note')
const auth = require('../middlewares/auth')
const noteRouter = express.Router()

noteRouter.get('/',auth, getNotes);

noteRouter.post('/',auth, createNotes);

noteRouter.put('/:id',auth,updateNotes);

noteRouter.delete('/:id',auth,deleteNotes);
module.exports = noteRouter