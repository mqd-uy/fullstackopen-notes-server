const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]


const url =
  `mongodb+srv://mqd-uy:${password}@cluster0.qstjepl.mongodb.net/testNotesApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// add 2 notes
const initialNotes = [
  {
    content: 'HTML is easy',
    important: false,
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true,
  },
]

Note.insertMany(initialNotes)
  .then(result => {
    console.log('add many notes result', result)
    mongoose.connection.close()
  })


// const note = new Note({
//     content: 'Nota 3',
//     important: false,
// })

// note.save().then(result => {
//     console.log('note saved!', result)
//     mongoose.connection.close()
// })

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})