import './GameOver.css'

const GameOver = ({retry, score}) => {
  return (
    <div className='gameOver'>
       <h1>Game Over</h1>
       <h2>A sua pontuação foi de: <span> {score} pontos </span>!</h2>
       <button onClick={retry}>Tentar novamente</button>
    </div>
  )
}

export default GameOver