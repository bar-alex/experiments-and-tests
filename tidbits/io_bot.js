
const events = require('events');
const fs = require('fs');
const readline = require('readline');

const dataFile = './io_bot_data.txt'

async function processDataFile() {
    try {
        const rl = readline.createInterface({
            input: fs.createReadStream(dataFile),
            crlfDelay: Infinity
        });

        rl.on('line', (line) => {
            // console.log(`Line from file: ${line}`);
            processLine( line )
        });

        await events.once(rl, 'close');

        console.log('Reading file line by line with readline done.');
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
    } catch (err) {
        console.error(err);
    }
};


// keep track as we parse each line from data file
let state = {
    caseCount: undefined,
    case: undefined,
    lineCount: undefined,
    energy: undefined,
    line: undefined,
}

// for each case 4 lists, 2 on each side and each of them of 0 balls and 1 balls, the values represent the energy to reach
// { rightOne, rightZero, leftOne, leftZero, energy }
let cases = [];

// takes the line with (pos, ball)
function processLine (line) {

    s1 = line.split(' ')[0]
    s2 = line.split(' ')[1]

    // total cases - first line
    if (state.caseCount == undefined){   // no total cases
        state.caseCount = +s1;
        return 
    }
    
    cases[ state.case ] = cases[ state.case ] ?? 
        { 
            energy: undefined, 
            rightZero: [],
            rightOne: [],
            leftZero: [],
            leftOne: [], 
            output: undefined,
        };
    
    let currentCase = cases[ state.case ];

    // one of the cases line, (nr_line, energy)
    if (state.case == undefined 
    || (state.case < state.caseCount && state.line == state.lineCount) ){      // no current case

        state.case = state.case??0 + 1;

        state.lineCount = +s1;

        currentCase.energy = +s2;

    } else {    // i'm on a line with positions

        // s1 is position, i.e. energy and s2 is the ball
        if (s1 > 0 && s2 == 0) {
            currentCase.rightZero.push( +s1 );

        } else if (s1 > 0 && s2 == 1) {
            currentCase.rightOne.push( +s1 );

        } else if (s1 < 0 && s2 == 0) {
            currentCase.leftZero.push( +s1 );

        } else if (s1 < 0 && s2 == 1) {
            currentCase.leftOne.push( +s1 );

        } else {
            console.error('data incorrect, pair (${s1}, ${s2}) not accepted ');
        }

        state.line = state.line??0 + 1;

    }

}


function calcCase ( caseNo ) {

    let 


}


// read the file
processDataFile().then