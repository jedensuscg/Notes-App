const chalk = require('chalk')
const figlet = require('figlet');
const yargonaut = require('yargonaut')
.style('blue.bold')
.style('blue.yellow', 'required')
.errorsStyle('red.bold')

const yargs = require('yargs')
const notes = require('./notes.js')

titleFig = function() {
    figlet.text('EDENS NOTES!', {
        font: 'big',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 100,
        whitespaceBreak: true
    }, function(err, data) {
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
yargs
    .command({
        command: (['add', 'a', 'new']), 
        describe: 'Add a new note',
        builder: { 
            title: {
                alias: 't',
                describe: 'Note Title',
                demandOption: true,
                type: 'string'
            },
            body: {
                alias: 'b',
                describe: 'Note text',
                demandOption: true,
                type: 'string'
            }
        },
        handler: function(argv) {
            console.log('Title: ' + argv.title)
            console.log('Body: ' + argv.body)
        }
})

//Create Remove command
yargs.command({
    command: (['remove', 'r','d', 'delete']),
    describe: 'Remove a note',
    handler: function() {
        console.log('Deleting note!')
    }
})

//Create List command
yargs.command({
    command: (['list','l']),
    describe: 'Lists all notes',
    handler: function() {
        console.log('Listing notes!')
    }
})

//Create Read command
yargs.command({
    command: (['read','r','open']),
    describe: 'Read a notes',
    handler: function() {
        console.log('Reading a note!')
    }
})

yargs.parse()