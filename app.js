const chalk = require('chalk')
const { argv } = require('yargs')
const yargonaut = require('yargonaut')
    .style('blue.bold')
    .style('blue.yellow', 'required')
    .errorsStyle('red.bold')

const yargs = require('yargs')
const noteHandler = require('./noteHandler.js')

titleFig = () => {
    figlet.text('EDENS NOTES!', {
        font: 'big',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 100,
        whitespaceBreak: true
    }, function (err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(chalk.yellowBright(data));
    });
}


//Customize yargs version
yargs.version('0.1.0')

//Create add command
yargs.command({
    command: (['add', 'a', 'new']),
    describe: 'Add a new note',
    builder: {
        title: {
            alias: 't',
            describe: 'Note Title',
            demandOption: true,
            type: 'string',
        },
        body: {
            alias: 'b',
            describe: 'Note text',
            demandOption: true,
            type: 'string'
        }
    }
})

//Create Read command
yargs.command({
    command: ('read'),
    describe: 'Read a notes',
    builder: {
        index: {
            describe: 'Note Index. Can be found using list command.',
            demandOption: true,
            type: 'string',
        }
    },
    handler() {
        noteHandler.readNote(argv.index)
    },
})



//Create Remove command
yargs.command({
    command: (['remove', 'r', 'd', 'delete']),
    describe: 'Remove a note',
    builder: {
        index: {
            describe: 'Index of the note to remove. Can be found using list command.',
            demandOption: true,
            type: 'string'
        },
    },
    handler() {
        noteHandler.removeNote(argv.index)
    }
})

//Create List command
yargs.command({
    command: (['list', 'l']),
    describe: 'Lists all notes',
    handler() {
        noteHandler.listNotes()
    }
})



yargs.parse()