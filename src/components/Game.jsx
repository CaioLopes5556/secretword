import { useState, useRef } from 'react';
import './Game.css'

const Game = ({
  retry,
  verifyLetter,
  pickedCategory,
  pickedWord,
  guessedLetters,
  wrongLetters,
  letters,
  guesses,
  score
}) => {
 
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault()
    verifyLetter(letter);

    //clean the letter input
    setLetter("");

    //ref
    letterInputRef.current.focus();
  }


  return (

    <div className="game">

      <p className="points">
        <span>pontuação: {score}</span>
      </p>

      <h1>Adivinhe a palavra</h1>

      <h3 className="tip">
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>

      <p>Você ainda tem {guesses} tentativas..</p>

      <div className="wordContainer">
        {
          letters.map((letter, i)=>(
            guessedLetters.includes(letter) ? (             
            <span className="letters" key={i} >{letter}</span>
          )
            : (
          <span className="blank-square" key={i}></span>
          )
          ))
        }
      </div>

      <div className="letterContainer">

        <p>Tente advinhar a letra da palavra:</p>

        <form onSubmit={handleSubmit}>
          <input 
          type="text" 
          name="letter" 
          maxLength={1} 
          required 
          onChange={(e) => setLetter(e.target.value)}
          value={letter}  
          ref={letterInputRef}
          />
          <button>Jogar!</button>
        </form>
        

      </div>

     
     {
      wrongLetters.length !== 0 && 
      <div className="wrongLettersContainer">
        <p>Letras erradas:</p>
        {
          
          wrongLetters.map((letter,i)=>(
              <span key={i}>{letter}</span>
          ))
        }
      </div>
     }

      

      <div>
      <button className='quit-btn' onClick={retry}>Desistir</button>
      </div>
      
    </div>
  )
}

export default Game