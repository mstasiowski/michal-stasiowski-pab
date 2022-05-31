import express from "express"
import {
  Request,
  Response
} from "express"
const bodyparser = require("body-parser")

const app = express()
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: true
}));

const PORT = 3000

const date1 = new Date();
date1.toISOString();

interface Note {
  id ? : number;
  title: string;
  content: string;
  createDate ? : string;
  tags ? : Tag[];

}

interface Tag {
  id ? : number;
  name: string;
}

// const notes: Note =
//  {
//   id: 1,
//   title: "test",
//   content: "content1",
//   createDate: date1.toISOString(),
//   tags:["pierwszy","test1"],
// }

let notes: any[] = [];

let tags: Tag[] = [{
  "id": 1652920931356,
  "name": "tagtest"
}];



//POST note
app.post('/note', function (req: Request, res: Response) {

  const note = req.body;
  let iD = Date.now();
  const date1 = new Date().toISOString();

  // const createNote = { ...note, id: iD}
  const createNote: Note = {
    id: iD,
    title: req.body["title"],
    content: note.content,
    createDate: date1,
    tags: note.tags


  }

  notes.push(createNote);


  if (createNote.title && createNote.content != null) {
    //res.send(`Note with id:  ${createNote.id} and name: ${createNote.title} added to the database! `)
    res.statusMessage = `Note with id:  ${createNote.id} and name: ${createNote.title} added to the database! `
    res.sendStatus(201);
  } else {
    res.sendStatus(400)
  }

})

// update note
app.put('/note/:id', function (req: Request, res: Response) {

  const iD = parseInt(req.params.id);
  const note = notes.find((note) => note.id === iD);
  const {
    title,
    content,
    tags
  } = req.body;
  if (note != null) {
    if (title) {
      note.title = title;
    }

    if (content) {
      note.content = content;
    }

    if (tags) {
      note.tags.id = tags;
    }
    res.send(`note with id: ${iD} has been updated`)

  } else {
    res.sendStatus(404);
  }

})

// Get note by id
app.get('/note/:id', function (req: Request, res: Response) {

  const iD = parseInt(req.params.id);
  const foundNote = notes.find((note) => note.id === iD);
  if (foundNote != null) {
    res.statusMessage = `id: ${foundNote.id}, title: ${foundNote.title}, content: ${foundNote.content}, createDate: ${foundNote.createDate} `;
    res.sendStatus(200);
  } else {
    res.statusMessage = "note not found";
    res.sendStatus(404)
  }
})

//Get all notes
app.get('/notes', function (req: Request, res: Response) {

  if (Object.keys(notes).length) //warunek czy obiekt jest pusty
  {
    //console.log(notes);
    res.send(notes);
  } else {
    res.sendStatus(404);
  }
})


//POST tag
app.post('/tag', function (req: Request, res: Response) {

  const tag = req.body;
  let iD = Date.now();

  const createTag: Tag = {
    id: iD,
    name: tag.name
  }

      for(let i = 0 ; i < tags.length; i++)
      {
          
          
          if(tags[i].name == tag.name)
          {
             console.log(`Bad: ${tags[i].name} = ${tag.name}`);
               
          }else
          console.log("ok")
          
          
          
      }


      if (createTag.id && createTag.name.length != 0) {

        tags.push(createTag);
        res.statusMessage = `Tag with id:  ${createTag.id} and name: ${createTag.name} added to the database! `
        res.sendStatus(201);
      } else {
        res.sendStatus(400)
      }


    



  



})

// update tag
app.put('/tag/:id', function (req: Request, res: Response) {

  const iD = parseInt(req.params.id);
  const tag = tags.find((tag) => tag.id === iD);
  const name = req.body.name;
  if (tag != null) {
    if (name) {
      tag.name = name;
    }
    res.send(`tag with id: ${tag.id} name: ${tag.name} has been updated`)

  } else {
    res.sendStatus(404);
  }

})


// Get tag by id
app.get('/tag/:id', function (req: Request, res: Response) {

  const iD = parseInt(req.params.id);
  const foundTag = tags.find((tag) => tag.id === iD);
  if (foundTag != null) {
    res.statusMessage = ` Tag id: ${foundTag.id}, Tag name: ${foundTag.name}`;
    res.sendStatus(200);
  } else {
    res.statusMessage = "tag not found";
    res.sendStatus(404)
  }
})

//Get all tags
app.get('/tags', function (req: Request, res: Response) {

  if (Object.keys(tags).length) //warunek czy obiekt jest pusty
  {
    //console.log(tags);
    res.send(tags);

  } else {
    res.sendStatus(404);
  }
})


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