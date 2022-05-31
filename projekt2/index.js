"use strict";
exports.__esModule = true;
var express_1 = require("express");
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
var PORT = 3000;
var date1 = new Date();
var notes = [
    {
        id: 1,
        title: "test",
        content: "content1",
        createDate: date1.toISOString(),
        tags: ["pierwszy", "test1"]
    },
];
app.post('/note', function (req, res) {
    var note = req.body;
    var id = req.body.id;
    var date1 = new Date().toISOString();
    var createNote;
    {
        id: id;
        title: req.body.title;
        content: req.body.content;
        createDate: Date;
        tags: req.body.tags;
    }
    notes.push(createNote);
    res.send("Note with id:  ".concat(note.id, " added to the database"));
});
app.get('/note/:id', function (req, res) {
    var id = parseInt(req.body.id);
    var foundNote = notes.find(function (note) { return note.id === id; });
    res.send(foundNote);
});
app.listen(PORT);
// interface Note {
//   id?: number
//   title: string
//   content: string
//   createDate?: string
//   tags?: Tag[]
// }
// interface Tag {
// id?: number
// name: string
// }
// let notes: Note[] = [
//   {
//     id:1,
//     title: "test",
//     content: "this is test",
//     createDate: "rndDate",
//     tags: [
//      { id:1,
//       name: "teeeest"}
//     ]
//   }
// ]
// let tags = [
//   {id: 2, name:"teeeest111"}
// ]
// app.post('/note', function(req: Request, res: Response) {
//   const iD = req.body.iD == null? Date.now(): req.body.iD
//   const date = new Date().toISOString()
//   const createNote: Note = {
//     id: iD,
//     title: req.body.title,
//     content: req.body.content,
//     createDate: date,
//     tags: req.body.tags
//   }
//   const noteTags = req.body.tags as Tag[]
//   noteTags.forEach(tagarray => {
//     if(!tags.findIndex(tag=>tag.name === tagarray.name))
//     {
//       const tagId = tagarray.id == null? Date.now(): tagarray.id
//       const newTag: Tag = 
//       {
//         id: tagId,
//         name: tagarray.name
//       }
//       noteTags.push(newTag)
//     }
//   })
//   res.send(`Note ${createNote.id} added to the database!`)
// })
// app.get('/note:id', function(req: Request, res: Response){
//   const iD = parseInt(req.params.id)
//   if(notes.findIndex(note=>note.id == iD))
//   {
//     res.sendStatus(200).send(notes.findIndex(note=>note.id == iD))
//   }else{
//     res.sendStatus(404).send("no object")
//   }
// })
// app.listen(PORT)
