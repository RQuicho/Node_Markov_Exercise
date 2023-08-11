/** Command-line tool to generate Markov text. */
const markov = require('./markov');
const fs = require('fs');
const axios = require('axios');


const generateText = (data) => {
    let mm = new markov.MarkovMachine(data);
    mm.makeText();
}

const fileArg = (path) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if(err) {
            console.log(`Cannot read file: ${path}: ${err}`);
            process.kill(1);
        } else {
            generateText(data);
        }
    });
}


async function webArg (url) {
    try {
        let res = await axios.get(url);
        generateText(res.data);
    }
    catch(err) {
        console.log(`Cannot read url: ${url}: ${err}`);
        process.kill(1);
    }
}

if (process.argv[2] === 'file') {
    fileArg(process.argv[3]);
} else if (process.argv[2] === 'url') {
    webArg(process.argv[3]);
} else {
    console.log(`Unknown argument`);
    process.kill(1);
}
