const fs = require("fs");
const chalk = require('chalk')
const noteFile = 'notes.json'

const getNotes = function () {
    return "Your Notes...";
};

const addNote = function (title, body) {
    const notes = loadNotes();

    //Check for duplicate note Title, case sensetive
    const duplicateNotes = notes.filter(function (note) {
        return note.title.toLowerCase() === title.toLowerCase();
    });

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body,
        });
        saveNotes(notes);
        console.log(`Added new note to file with Title: ${title}`);
    } else {
        console.log(chalk.red("Note title already exists"));
    }
};

const removeNote = function (title) {
    console.log(title)
    const notes = loadNotes();
    const noteExists = notes.filter(function (note) {
        return note.title.toLowerCase()=== title.toLowerCase();
    });

    if (noteExists.length != 0) {
        console.log(`Removed note titled ${title}`)
    } else {
        console.log(chalk.red(`A note titled ${title} does not exist!`))
    }

}

// #region HELPER FUNCTIONS
const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync(noteFile);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (err) {
        return [];
    }
};

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync(noteFile, dataJSON);
};
// #endregion

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
};
