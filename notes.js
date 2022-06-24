const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => "Your notes...";

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  debugger;

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green("New note added!"));
  } else {
    console.log(chalk.red("Note title taken!"));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const finalNotes = notes.filter((note) => note.title !== title);

  if (finalNotes.length === notes.length) {
    console.log(chalk.red("title not found"));
  } else {
    saveNotes(finalNotes);
    console.log(chalk.green("note removed successfully"));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.yellow.inverse("Your Notes:"));
  notes.forEach((note) => {
    console.log(note.title);
  });
};

// read note function
const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((n) => n.title === title);
  if (!note) {
    console.log(chalk.red("note not found"));
  } else {
    console.log(chalk.yellow(note.title + ": ") + chalk.green(note.body));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
