import { useState , useEffect } from 'react';
import './App.css';
import {MagnifyingGlass} from 'react-loader-spinner'
import nodata from './assets/nodata.svg'
function App() {
  const [word, setWord] = useState('');
  const [getData, setGetData] = useState({});
  const [isloading, setisloading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
 
  const handleSearch = async () => {
    // Set loading state to true (indicating that a request is in progress)
    setisloading(true);
    setShowDropdown(false);
    try {
      // Attempt to fetch data from the dictionary API
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      
      // Parse the response data as JSON
      const data = await response.json();
  
      // Update state with the fetched data (assuming the API returns an array, and we want the first item)
      setGetData(data[0]);
      
       // Update search history
       setSearchHistory((prevHistory) => {
        const newHistory = [word, ...prevHistory.slice(0, 4)]; // Keep the last 3 searches
        localStorage.setItem('searchHistory', JSON.stringify(newHistory)); // Save to localStorage
        return newHistory;
      });
      setShowDropdown(false)
      // Log the first item in the data array to the console
      console.log(data[0]);

       
    } catch (error) {
      // If an error occurs during the fetch, set loading state to false and log the error
      setisloading(false);
      console.error('Error fetching data:', error);
    }
  
    // Set loading state to false (whether the fetch was successful or not)
    setisloading(false);
  };  
  useEffect(() => {
    // Load search history from localStorage on component mount
    const storedHistory = localStorage.getItem('searchHistory');
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
    if (word.length==0) {
      setShowDropdown(false)
    }
  }, [word]);

    const playAudio = (audioUrl) => {
    const audio = new Audio(audioUrl);
    audio.play();
  };

  const handleDropdownItemClick = (item) => {
    // Handle the selected item from the dropdown
    console.log('Selected:', item);
    // Optionally, you can set the selected item to the input field or perform other actions
    setWord(item);
    // Close the dropdown
    setShowDropdown(false);
  };




  return (
    <div className='lg:max-w-screen-xl md:max-w-screen-lg sm:max-w-screen-md mx-auto pt-10' >
      
      {/* TITLE */}
       <h1 className='flex justify-center pb-10 text-3xl font-semibold '>DICTIONARY</h1>  

      {/* INPUT */}
      <div className="relative">
        <label htmlFor="Search" className="sr-only"> Search </label>
        <input
        
          onChange={(e) => {
            setWord(e.target.value);
          }}
          onBlur={()=>setShowDropdown(false)}
          onClick={() => setShowDropdown(true)}
          value={word}
          type="text"
          id="Search"
          autoComplete="off"
          placeholder="Search for..."
          className="w-full h-16 px-5 rounded-md border border-gray-700 py-2.5 pe-10 shadow-sm sm:text-lg"
        />

         {/* Dropdown Menu */}
        {showDropdown && (
          <div  className="absolute z-30 border border-stone-900 h-20 overflow-y-scroll w-full top-full left-0 mt-1 bg-white rounded-md shadow-lg">
            {/* Replace the following with your actual dropdown items */}
            {searchHistory.map((item, index) => (
              <button
                key={index}
                onClick={() => handleDropdownItemClick(item)}
                className=" w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
              >
                {item}
              </button>
            ))}
            {/* Add more items as needed */}
          </div>
        )}
        
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
      {!isloading && getData?.word ? (
        <div className="mt-8 p-6 border border-sky-900 bg-white rounded-md shadow-md relative">
        
        <div className='absolute right-8 top-10'> {getData.phonetics[0].audio && (
                <button
                  onClick={() => playAudio(getData.phonetics[0].audio)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                  Play Audio
                </button> 
              )}
        </div>

          <h2 className="text-xl font-semibold mb-2">{getData?.word}</h2>
          
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
      (
  <div>
    {getData === undefined && !isloading ? (
      <div className='flex flex-col items-center justify-center pt-16'>
        <h1 className='text-lg text-red-500'>OOPS!! NO DATA FOUND </h1>
        <img className='h-40 w-40' src={nodata} alt="" />
      </div>
    ) : null}
  </div>
)}
       {isloading && <div className='flex justify-center items-center h-full w-full left-0 absolute top-0 z-50 bg-slate-950/40 '><MagnifyingGlass 
  visible={true}
  height="120"
  width="120"
  ariaLabel="magnifying-glass-loading"
  wrapperStyle={{}}
  wrapperClass="magnifying-glass-wrapper"
  glassColor="#c0efff"
  color="#e15b64"
  /></div>  }
    </div>
  );
}

export default App;
