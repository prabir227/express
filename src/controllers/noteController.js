const noteModel = require('../models/note');

const createNotes = async (req, res) => {
    const{title, content} = req.body;

    const newNode = new noteModel({
        title : title,
        content : content,
        userId : req.userId
    })

    try{
        await newNode.save();
        res.status(201).json(newNode);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
};

const updateNotes = async (req, res) => {
    const {title, content} = req.body;
    const id = req.params.id;
     const newNote={
        title: title,
        content: content
     };

     try{
        const updatedNote = await noteModel.findByIdAndUpdate(id, newNote, {new: true});
        res.status(200).json(updatedNote);
     }
     catch(error){
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
     }

};

const deleteNotes = async (req, res) => {};

const getNotes = async (req, res) => {
    try{
        const notes = await noteModel.find({userId: req.userId});
        res.status(200).json(notes);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
};

module.exports = {createNotes, updateNotes, deleteNotes, getNotes};