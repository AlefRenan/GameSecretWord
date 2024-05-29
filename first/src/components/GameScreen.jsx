import { useState, useRef } from "react";
import "./GameScreen.css";

const GameScreen = ({
  verifyLetter,
  category,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}) => {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();

    verifyLetter(letter);
    setLetter("");

    //Para focar no input apos a jogada
    letterInputRef.current.focus();
  };

  return (
    <>
      <p className="points">Pontuação: {score} </p>
      <h1>Adivinhe a palavra</h1>
      <h3 className="tip">
        Dica Sobre a palavra: <span>{category}</span>
      </h3>
      <p>Você ainda tem tentativa(s): {guesses}</p>
      <div className="game">
        {letters.map((Letra, i) =>
          guessedLetters.includes(Letra) ? (
            <span key={i} className="palavra">
              {Letra}
            </span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        )}
      </div>
      <div className="center">
        <p>Tente adivinhar uma palavra:</p>\
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="block"
            maxLength="1"
            required
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={letterInputRef}
          />
          <button className="start">JOGAR!</button>
        </form>
      </div>
      <p>
        Letras já utilizadas:
        {wrongLetters.map((letter, i) => (
          <span key={i}> {letter} , </span>
        ))}
      </p>
    </>
  );
};

export default GameScreen;
