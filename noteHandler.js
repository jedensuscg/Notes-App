const fs = require("fs");
const chalk = require('chalk')
const noteFile = 'notes.json'

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.blue.bold("YOUR NOTES"))
    notes.forEach(note => {
        console.log(chalk.blue(`(${note.index})`) + ` ${note.title}`)
    });
    console.log('To read a note by index, type ' + chalk.yellow(`node add.js read --index="<index>"`))
    console.log('To read a note by title, type ' + chalk.yellow(`node add.js read --title="<title>"`))
};

const addNote = (title, body) => {
    debugger
    const notes = loadNotes();
    const lastNote = notes[notes.length - 1]
    let index = 0
    //Check for duplicate note Title, case sensetive
    const duplicateNote = notes.find((note) => note.title.toLowerCase() === title.toLowerCase())

    try {
        index = lastNote.index
    } catch (err) {
        index = 0
    }

    if (!duplicateNote) {
        index += 1
        notes.push({
            index: index,
            title: title,
            body: body,
        });
        saveNotes(notes);
        console.log(chalk.green.inverse(`Added new note to file with Title: "${title}"`));
    } else {
        console.log(chalk.red.inverse("A note with that title already exists"));
    }
};

const readNote = (index) => {
    const notes = loadNotes();
    const noteToRead = notes.find((note) => note.index === index)

    if (noteToRead) {
        console.log(chalk.blue.inverse(`${noteToRead.title}`))
        console.log(`${noteToRead.body}`)
    } else {
        console.log(chalk.red.inverse("No note with that index."))
    }
}

const removeNote = (index) => {
    const notes = loadNotes();
    const noteToDelete = notes.find((note) => note.index === index)

    const notesToKeep = notes.filter(function (note) {
        return note.index !== index
    })
    if (notesToKeep.length < notes.length) {
        console.log(chalk.green.inverse(`Removed note titled '${noteToDelete.title}'`))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse(`A note with that index does not exist!`))
    }
    recountIndex(notesToKeep)
}

// #region HELPER FUNCTIONS
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync(noteFile);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (err) {
        return [];
    }
};

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync(noteFile, dataJSON);
};

const recountIndex = (notes) => {
    let index = 1
    notes.forEach(note => {
        note.index = index
        index += 1
    })
    saveNotes(notes)
}
// #endregion

module.exports = {
    listNotes: listNotes,
    addNote: addNote,
    readNote: readNote,
    removeNote: removeNote
};
