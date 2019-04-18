const fs = require('fs' )
const chalk = require('chalk')


// add note
const addNote = (title, body) => {
     const notes = loadNotes() 
     const duplicateNote = notes.find((note) => note.title === title)

     debugger

     if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        
        saveNotes(notes) 
        console.log(chalk.green.inverse('New note added! '))
     } else {
         console.log(chalk.red.inverse('Note title taken!'))
     }
 
}


// remove note
const removeNote = (title) => {
    const notes = loadNotes()
    // for( var i = 0; i < notes.length; i++){ 
    //     if ( notes[i].title === title) {
    //       notes.splice(i, 1);
    //     }
    //  }
    const notesToKeep = notes.filter((note) => note.title !== title)
     saveNotes(notesToKeep)
     if(notes.length === notesToKeep.length) {
         console.log(chalk.black.bgRed('Note not found!'))
     } else {
         console.log(chalk.black.bgGreen('Note removed!'))
     }
}


//List note
const listNotes = () => {
    console.log(chalk.green.inverse("Your notes"))
    const notes = loadNotes()
    notes.forEach((note) => console.log(note.title))
}

//Read note
const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    if(note) {
        console.log(chalk.green.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse('No note found'))
    }
    
}

const saveNotes = (notes) => {
     const dataJSON = JSON.stringify(notes) 
     fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => { 

    try {
     const dataBuffer = fs.readFileSync('notes.json')
     const dataJSON = dataBuffer.toString()
    //  console.log(dataBuffer)
    //  console.log(dataJSON)
    //  console.log(JSON.parse(dataJSON))
     return JSON.parse(dataJSON)

    } catch (e) {
        return []
    }
     
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}