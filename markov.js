/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/); // splits text on spaces and linebreaks to make a list of words
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    console.log(this.words); // Output: ['the', 'cat', 'in', 'the', 'hat']
    //console.log(this.words[0]); // Output: the
    //console.log(this.words[0+1]); // Output: cat

    

    //obj[this.words[0]] = 'test'; // Output: {the: 'test'}
    //obj[this.words[0]] = this.words[0+1]; // Output: {the: 'cat'}
    //obj[this.words[0]] = [this.words[0+1], this.words[4]]; // Output: {the: 'cat', 'hat'}
    //obj[this.words[1]] = [this.words[1+1]]; // Output: { the: ['cat', 'hat'], cat: ['in'] }
    

    // for (let word of this.words) {
    //   let nextWord = this.words[this.words.indexOf(word)+1];
    //   if (nextWord === undefined) {
    //     obj[word] = [null];
    //   } else {
    //     obj[word] = [nextWord];
    //   }
      
    // }

    let chain = {};
    
    for (let i=0; i<this.words.length; i++) {
      let word = this.words[i];
      let nextWord = this.words[i+1];

      if (!chain[word]) {
        chain[word] = [];
      } 
      
      if (nextWord === undefined) {
        chain[word].push(null);
      } else {
        chain[word].push(nextWord)
      }

    }
    console.log(chain); // {the: ["cat", "hat"], cat: ["in"], in: ["the"], hat: [null]}
    this.chain = chain; 

  }


  /** return random text from chains */

  makeText(numWords = 10) {
    // TODO
    let randomIndex = Math.floor(Math.random() * this.words.length);
    let randomWord = this.words[randomIndex];
    console.log(randomWord); // logs random word from text

    let randomText = [randomWord];

    for (let i=0; i<numWords; i++) {
      let nextTextWords = this.chain[randomWord]; // array of potential next words from chains object (the: ['cat', 'hat'])
      console.log(nextTextWords);
      let nextTextIndex = Math.floor(Math.random() * nextTextWords.length); // random number from previous array
      let nextTextWord = nextTextWords[nextTextIndex];
      randomText.push(nextTextWord);
      randomWord = nextTextWord;
    }
    console.log(randomText.join(' '));
    return randomText.join(' ');


  }
}
