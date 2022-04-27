import express from 'express'
import { Request, Response } from 'express'
import { title } from 'process'

const app = express()
app.use(express.json())
const PORT = 3000

const date1 = new Date();
date1.toISOString();

interface Note {
  id?: number ;
  title: string ;
  content: string;
  createDate? : string;
  tags?: string[];
}

interface Tag {
  id?: number;
  name: string;
}

let notes : Note =
{
 id: 1,
 title: "test",
 content: "content1",
 createDate: date1.toISOString(),
 tags:["pierwszy","test1"]
}

app.post('/note',function(req:Request, res:Response){

let id:number = req.body.id;
const date1 = new Date().toISOString();


if(id == null)
{
  id = Date.now();
}else
{
  id = req.body.id;
}

let createNote: Note
{
  id: id;
  title: req.body.title;
  content: req.body.content;
  createDate: Date;
  tags: req.body.tags;

}


})
 


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