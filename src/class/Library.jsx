
import { useState, useEffect } from "react";
import Score from '../components/Score'

export default function Library() {
  const [highScore, setHighScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [pickedCard, setPickedCard] = useState([]);
  const [data, setData] = useState([]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  function generateUniqueNumbers(length=12, min=0, max=100) {
    const uniqueNumbers = new Set();
  
    while (uniqueNumbers.size < length) {
      uniqueNumbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
    }
  
    return Array.from(uniqueNumbers);
  }

  const clickImg = (url, currentScore) => {
    if (!pickedCard.includes(url)) {
      let score = currentScore + 1;
      setPickedCard([...pickedCard, url]);
      setCurrentScore(score);
      setData(shuffleArray(data));

      if (score >= highScore) {
        setHighScore(score);
      }
      if (pickedCard.length === data.length) {
        setPickedCard([]);
      }
    } else {
      alert("Fail")
      setPickedCard([]);
      setCurrentScore(0);
      setData(shuffleArray(data));

      
    }
  };

  async function fetchData() {
    try {
      const imgIndexs = generateUniqueNumbers(12);
      const promises = imgIndexs.map(async (index) => {
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${index + 1}`;
        const response = await fetch(pokemonUrl, { mode: 'cors' });
        const pokemonData = await response.json();
        return pokemonData.sprites.front_default;
      });
  
      
      const data = await Promise.all(promises);
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);      
      return []; 
    }
  }
  
  useEffect(() => {
    (async () => {
      const data = await fetchData();
      setData(data);
    })();
  }, []);

  return (
    <>
      
      <Score highScore={highScore} currentScore={currentScore} ></Score>
      <div id="gallery">
        {data.map((imgUrl) => {
          return (
            <img
              key={imgUrl}
              src={imgUrl}
              alt="pokemon"
              onClick={() => clickImg(imgUrl, currentScore)}
            />
          );
        })}
      </div>
    </>
  );
}
