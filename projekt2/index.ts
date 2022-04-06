import express from 'express'
import {Request, Response} from 'express'
import { networkInterfaces } from 'os'
import { title } from 'process'
import fs from 'fs'
const app = express()
app.use(express.json())

//need  fix !!!
interface Note {
  id?: number
  title: string;
  content: string;
  createDate: string;
  tags?: Tag[];
}

let notes : Note[] =[
  {
    id: 1,
    title: "test",
    content: "this is a test note",
    createDate: "rndDate",
    tags: [id: 1, name:"test"]
  }
]

//Post method
app.post('/note', function (req: Request, res: Response) {
  const data = new Date().toISOString()
  const id = req.body.id == null? Date.now(): req.body.id
  const newNote : Note =
  {
    id : id,
    title : req.body.title,
    content : req.body.content,
    createDate : data,
    tags : req.body.tags
  }

  //new tags
  const noteTags = req.body.tags as Tag[]

  noteTags.forEach(tagarray => {
    if(!tags.findIndex(tag=>tag.name === tagarray.name))
    {
      const tagID = tagarray.id == null? Date.now() : tagarray.id
      const newTag: Tag = 
      {
        id: tagID,
        name:tagarray.name
      }
      noteTags.push(newTag)
    }
  });

  if(newNote.title!==null && newNote.content!=null)
  {
    //status 201
    notes.push(newNote);
    res.send(notes.find(note=>note.id == id))
  }else
  {
    //status 404
    res.send("error 404 not found")
  }

//GET

app.get('/note/:id', function(req: Request, res: Response)
{
  const id = +req.params.id
  if(notes.find(note=>note.id == id !== undefined))
  {
    res.send(notes.find(note=>note.id == id))
  }else
  {
    res.send("not found")
  }
})

app.get('/notes', function(req :Request, res:Response)
{
if(notes != null)
{
  res.send(notes)
}else
{
  res.send("There's 0 notes")
}
})


//Put
app.put('/note/:id', function(req:Request, res:Response)
{
  const id = +req.params.id
  if(notes.find(note=>note.id == id) !== undefined)
  {
    notes[notes.findIndex(note=>note.id == id)] = req.body;
    res.send(notes.find(note=>note.id == id))
  }else
  {
    res.send("404 not found")
  }
})

//Delete
app.delete('/note/:id', function(req: Request, res: Response){
  const id = +req.params.id
  if(notes.find(note=>note.id == id) !== undefined){
    res.send(notes.find(note=>note.id == id))
    notes.splice(notes.findIndex(note=>note.id == id),1)
  }else{
    res.send("404 not found") 
  }
})

interface Tag {
  id?: number
  name: string


}

let tags : Tag[] =[
  {
    id: 1,
    name: "test"
  }
]


app.get('/:note/:id', function (req: Request, res: Response) {
  
  const id = parseInt(req.params.id)

  if(notes.findIndex(note=>note.id == id)){
    res.sendStatus(200).send(notes.findIndex(note=>note.id == id))
  }else {
    res.sendStatus(404).send("no object")
  }
})

app.post('/:note', function (req: Request, res: Response) {
  const data = new Date().toISOString()
  const id = req.body.id == null? Date.now(): req.body.id
  const newNote : Note =
  {
    id : id, 
    title : req.body.title,
    content : req.body.content,
    createDate : data,
    tags : req.body.tags
  }
  if(newNote.title!==null && newNote.content!==null)
  {
    notes.push(newNote);
    console.log(req.body) 
    res.sendStatus(201).send(newNote.id)
  }else{
    res.sendStatus(400).send("no title or content")
  }
  })

  app.put('/note/:id', function (req: Request, res: Response) {
    const id = parseInt(req.body.id)
    if(notes.findIndex(note=>note.id == id)){
      notes[notes.findIndex(note=>note.id == id)] = req.body;
      res.sendStatus(200).send(notes.findIndex(note=>note.id == id))
    }else{
      res.sendStatus(404).send("no object")
    }
  })
  
  app.delete('/note/:id', function(req: Request, res: Response){
    const id = parseInt(req.body.id)
    if(notes.find(note=>note.id == id)){
      res.sendStatus(200).send(notes.findIndex(note=>note.id == id))
      notes.splice(notes.findIndex(note=>note.id == id),1)
    }else{
      res.sendStatus(404).send("no object")
    }
  })

app.listen(3000);