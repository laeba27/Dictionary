import { useState } from 'react'
import './App.css'

function App() {
  // const [word, setword] = useState(" ")
  // const [getdata, setgetdata] = useState({})
  const [category, setcategory] = useState(" ")
  const [quote, setquote] = useState({})

 const apikey = "9NuIknuOpKM1VZ3YYPjy4g==b4HS03zsP6HODLPA"
//   const HandleSearch= async()=>{
//     // const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
//     // const data = await response.json();
//     // setgetdata(data);
//     // // console.log(data[0]?.meanings[0]?.definitions[0]?.definition)
//     const response = await fetch(`https://api.api-ninjas.com/v1/quotes?category=${category}`,{method: 'GET',
//       headers:{"x-api-key":apikey,'Content-Type': 'application/json'},
//     })
// const data = await response.json()
// if (data) {
//   setquote(data)
// }

// console.log(data)
//   }

const HandleSearch = async () => {
  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
      method: 'GET',
      headers: {
        'x-api-key': apikey,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.length > 0) {
      setquote(data[0]); // Assuming you want to set the first quote from the array
    } else {
      console.log('No quotes found for the specified category.');
    }

    console.log(data);
  } catch (error) {
    console.error('Error fetching quotes:', error);
  }
};

  
  return (
    <div className='px-28 pt-10'>
  {/* INPUT */}
<div className="relative ">
  <label htmlFor="Search" className="sr-only"> Search </label>

  <input
  onChange={(e)=>{
    setcategory(e.target.value)
  }}
    value={category}
    type="text"
    id="Search"
    placeholder="Search for..."
    className="w-full h-16 px-5 rounded-md border border-gray-700 py-2.5 pe-10 shadow-sm sm:text-lg"
  />

  <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
    <button onClick={HandleSearch} type="button" className="text-gray-600 hover:text-gray-700">
      <span className="sr-only">Search</span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-7 w-7 "
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
<h1>{quote?.quote}</h1>
    </div>
  )
}

export default App
