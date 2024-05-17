import { useCallback, useEffect, useState } from "react";
import "./App.css";
import GameScreen from "./components/GameScreen";
import HomeScreen from "./components/HomeScreen";
import EndScreen from "./components/EndScreen";
import { wordsList } from "./components/Words";

const App = () => {
  const guessesQty = 10;
  //Criação da Dica e da Palavra
  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);
  // parte para funcionalidade do jogo, para ser enviado ao GameScreen
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(0);
  const [ponto, setPonto] = useState(0);
  //Para começar o jogo
  const [play, setPlay] = useState(false);
  const [end, setEnd] = useState(false);
  const handlePlay = () => {
    setPlay((prevPlay) => !prevPlay);
    setScore(0);
  };

  const handleEnd = () => {
    handlePlay();
    if (score > 1) {
      setPonto(score);
      setScore(0);
    }
    setGuesses(guessesQty);
    setEnd(true);
  };

  //Para selecionar a dica e a palavra
  const [words] = useState(wordsList);
  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category };
  }, [words]);
  const porraToda = useCallback(() => {
    clear();
    pickWordAndCategory();

    const { word, category } = pickWordAndCategory();
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters);
  }, [pickWordAndCategory]);

  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();
    //check if letter has already been utilized
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }
    // push guessed letter or remove a guess
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);
      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  const clear = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  useEffect(() => {
    if (guesses <= 0) {
      clear();
      handleEnd();
    }
  }, [guesses]);

  //check win condition
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    // win condition
    if (guessedLetters.length === uniqueLetters.length) {
      //add score
      setScore((actualScore) => (actualScore += 50));
      porraToda();
    }
  }, [guessedLetters, letters, porraToda]);

  return (
    <>
      {play ? (
        <GameScreen
          verifyLetter={verifyLetter}
          category={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      ) : (
        <>{end ? <EndScreen score={ponto} /> : <HomeScreen />}</>
      )}
      {play ? (
        <h1></h1>
      ) : (
        <button className="buttonStart" type="submit" onClick={handlePlay}>
          COMEÇAR JOGO
        </button>
      )}
    </>
  );
  w;
};

export default App;
