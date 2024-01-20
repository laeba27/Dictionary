import { useState } from 'react';
import './App.css';
import {MagnifyingGlass} from 'react-loader-spinner'
import nodata from './assets/nodata.svg'
function App() {
  const [word, setWord] = useState('');
  const [getData, setGetData] = useState({});
  const [isloading, setisloading] = useState(false)
  const apikey = "9NuIknuOpKM1VZ3YYPjy4g==b4HS03zsP6HODLPA";

  
  const handleSearch = async () => {
    setisloading(true)
    try {
      setisloading(true)
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = await response.json();
      setGetData(data[0]);
      console.log(data[0])
    } catch (error) {
      setisloading(false)
      console.error('Error fetching data:', error);
    }setisloading(false)
  };
  
  
    const playAudio = (audioUrl) => {
    const audio = new Audio(audioUrl);
    audio.play();
  };


  return (
    <div className='px-28 pt-10'>
      {/* INPUT */}
      <div className="relative">
        <label htmlFor="Search" className="sr-only"> Search </label>
        <input
          onChange={(e) => {
            setWord(e.target.value);
          }}
          value={word}
          type="text"
          id="Search"
          placeholder="Search for..."
          className="w-full h-16 px-5 rounded-md border border-gray-700 py-2.5 pe-10 shadow-sm sm:text-lg"
        />
        <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
          <button onClick={handleSearch} type="button" className="text-gray-600 hover:text-gray-700">
            <span className="sr-only">Search</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-7 w-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </span>
      </div>

      {/* WORD CARD */}
      {getData?.word ? (
        <div className="mt-8 p-6 bg-white rounded-md shadow-md relative">
        
        <div className='absolute right-8 top-10'> {getData.phonetics[0].audio && (
                <button
                  onClick={() => playAudio(getData.phonetics[0].audio)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                  Play Audio
                </button> 
              )}
        </div>

          <h2 className="text-xl font-semibold mb-2">{word}</h2>
          
          {getData.meanings.map((meaning, index) => (
            <div key={index} className="mb-4">
              <p className="text-gray-600">{meaning.partOfSpeech}</p>
              <ul className="list-disc ml-6">
                {meaning.definitions.map((definition, idx) => (
                  <li key={idx} className="mb-1">{definition.definition}</li>
                ))}
              </ul>
              
            </div>
          ))}
        </div>
      )  : 
      <div>
        {getData===undefined ? <img src={nodata} alt="" /> : null}
      </div>
       }
       {isloading && <MagnifyingGlass
  visible={true}
  height="80"
  width="80"
  ariaLabel="magnifying-glass-loading"
  wrapperStyle={{}}
  wrapperClass="magnifying-glass-wrapper"
  glassColor="#c0efff"
  color="#e15b64"
  /> }
    </div>
  );
}

export default App;
