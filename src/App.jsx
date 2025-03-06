//hooks
import { useCallback, useState, useEffect } from 'react'

//components
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import GameOver from './components/GameOver'

//data
import { wordsList } from './data/words'

//styles
import './App.css'


const stages = [
  {id:1, nameStage: 'start'},
  {id:2, nameStage: 'game'},
  {id:3, nameStage: 'end'},
]

function App() {



  const [gameStage, setGameStage] = useState(stages[0].nameStage)
  const [words] = useState(wordsList)
  const guessQty = 6;
  // console.log(words)

  const [pickedWord, setPickedWord] = useState('');
  const [pickedCategory, setPickedCategory] = useState('');
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessQty);
  const [score, setScore] = useState(0)

  const pickWordAndCategory = useCallback( () =>{
    // Choosing a categoy
    const categories = Object.keys(words);
    const sortedCategory = 
      categories[Math.floor(Math.random() * Object.keys(categories).length)]

    //Choosing a Word from the choosed category
    const sortedWord = words[sortedCategory][Math.floor(Math.random() * words[sortedCategory].length)]

    
    console.clear();
    // console.log(sortedCategory); 
    // console.log(sortedWord);

    return { sortedWord, sortedCategory };

  }, [words]);

//start secret word
  const startGame = useCallback( () => {
    //clean the states
    clearLetterStates();
    const { sortedWord, sortedCategory} = pickWordAndCategory();

    // console.log(sortedWord, sortedCategory);

    //Letters Array
    let wordLettters = sortedWord.split('')

    wordLettters = wordLettters.map((l) => l.toLowerCase())

    //setting the states
    setPickedCategory(sortedCategory);
    setPickedWord(sortedWord);
    setLetters(wordLettters);


    //starts the game
    setGameStage(stages[1].nameStage)
  }, [pickWordAndCategory]);
  
  // console.log(letters)

// process the letter input and finish the game
  const verifyLetter = (letter) => {
    
    //normalizes the letter to lower case
    const normalizedLetter = letter.toLowerCase();

    //check if the letter has already been utilized
    if(
      guessedLetters.includes(normalizedLetter) || 
      wrongLetters.includes(normalizedLetter)
    ){
      return;
    }

    //push the guessed letter or wrong letter
    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ])
    } else{
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
      ])

      setGuesses((actualGuesses) => actualGuesses - 1)

    }

  }

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }

  useEffect(() => {

    if(guesses <= 0){
      //reset all stages
      clearLetterStates();

      setGameStage(stages[2].nameStage);
    }

  }, [guesses]);


//check win condition
  useEffect(() =>{

    //Create an Array without repeated letters
    const uniqueLetters = [...new Set(letters)];

    //win condition
    if(guessedLetters.length === uniqueLetters.length && gameStage === stages[1].nameStage){
      
      //increases the score
      setScore((actualScore) => actualScore += 100)

      //restart game with new words
      startGame();
    }

    // console.log(uniqueLetters)

  }, [guessedLetters, letters, startGame])




// retry
  const retry = () => {
    //clear score and increases the guesses
    setScore(0)
    setGuesses(guessQty)
    //back to startScreen
    setGameStage(stages[0].nameStage)
  }

  return (
    <div className='App'>
      {gameStage === 'start' && <StartScreen start={startGame} /> }
      {gameStage === 'game' && 
      <Game
        retry={retry} 
        verifyLetter={verifyLetter} 
        pickedCategory={pickedCategory}
        pickedWord={pickedWord}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        letters={letters}
        guesses={guesses}
        score={score}
      /> }
      {gameStage === 'end' && <GameOver retry={retry} score={score} /> }
    </div>
  )
}

export default App
